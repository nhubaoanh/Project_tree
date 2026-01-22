from config import DATABASE_SCHEMA, FEW_SHOT_EXAMPLES

class PromptBuilder:
    
    @staticmethod
    def build_prompt(question, include_examples=True):
        prompt = "### Task\n"
        prompt += "Bạn là chuyên gia SQL cho hệ thống gia phả. Chuyển câu hỏi tiếng Việt thành SQL query.\n\n"
        prompt += "### Database Schema\n"
        prompt += DATABASE_SCHEMA + "\n\n"
        prompt += "### Rules\n"
        prompt += "1. LUÔN dùng dongHoId = ? và active_flag = 1\n"
        prompt += "2. CHỈ trả về SQL, KHÔNG giải thích\n"
        prompt += "3. Dùng ? cho parameters\n\n"
        
        if include_examples:
            prompt += "### Examples\n"
            for ex in FEW_SHOT_EXAMPLES:
                prompt += "Q: " + ex["question"] + "\n"
                prompt += "SQL: " + ex["sql"] + "\n\n"
        
        prompt += "### Your Task\n"
        prompt += "Q: " + question + "\n"
        prompt += "SQL:"
        
        return prompt
