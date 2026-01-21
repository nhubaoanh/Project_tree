import mysql.connector
from mysql.connector import Error
from config import DB_CONFIG
import logging

logger = logging.getLogger(__name__)

class QueryExecutor:
    
    def __init__(self):
        self.db_config = DB_CONFIG
    
    def execute_query(self, sql, params=None):
        connection = None
        try:
            connection = mysql.connector.connect(**self.db_config)
            cursor = connection.cursor(dictionary=True)
            sql_mysql = sql.replace('?', '%s')
            logger.info("Executing: " + sql_mysql)
            cursor.execute(sql_mysql, params or [])
            
            if cursor.description:
                columns = [desc[0] for desc in cursor.description]
                data = cursor.fetchall()
                row_count = len(data)
            else:
                data = []
                columns = []
                row_count = cursor.rowcount
                connection.commit()
            
            return {"success": True, "data": data, "columns": columns, "row_count": row_count}
        except Error as e:
            logger.error("DB error: " + str(e))
            return {"success": False, "error": str(e), "data": [], "columns": [], "row_count": 0}
        finally:
            if connection and connection.is_connected():
                cursor.close()
                connection.close()
    
    def test_connection(self):
        try:
            connection = mysql.connector.connect(**self.db_config)
            if connection.is_connected():
                connection.close()
                return True
            return False
        except Error as e:
            logger.error("Connection failed: " + str(e))
            return False

query_executor = QueryExecutor()
