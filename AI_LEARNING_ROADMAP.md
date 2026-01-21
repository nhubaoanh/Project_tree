# 🚀 LỘ TRÌNH HỌC AI - 3 THÁNG (Machine Learning → Deep Learning → NLP → CV)

> **Lộ trình học AI từ cơ bản đến nâng cao, dựa trên dự án Family Tree thực tế**
> 
> **Thời gian**: 3 tháng (12 tuần)
> **Mục tiêu**: Hiểu và áp dụng AI vào dự án thực tế
> **Phương pháp**: Lý thuyết + Thực hành + Bài tập

---

## 📋 MỤC LỤC

- [Tổng quan lộ trình 3 tháng](#tổng-quan-lộ-trình-3-tháng)
- [THÁNG 1: Machine Learning & Deep Learning Cơ bản](#tháng-1-machine-learning--deep-learning-cơ-bản)
- [THÁNG 2: Natural Language Processing (NLP)](#tháng-2-natural-language-processing-nlp)
- [THÁNG 3: Computer Vision & Advanced Topics](#tháng-3-computer-vision--advanced-topics)
- [Kiến trúc AI trong dự án Family Tree](#kiến-trúc-ai-trong-dự-án-family-tree)
- [Tài nguyên học tập](#tài-nguyên-học-tập)

---

## 📅 TỔNG QUAN LỘ TRÌNH 3 THÁNG

### Tháng 1: Machine Learning & Deep Learning Cơ bản
- **Tuần 1-2**: Python, NumPy, Pandas cơ bản
- **Tuần 3-4**: Machine Learning với Scikit-learn
- **Tuần 5-6**: Deep Learning với PyTorch

### Tháng 2: Natural Language Processing
- **Tuần 7-8**: NLP cơ bản, Tokenization, Embeddings
- **Tuần 9-10**: Transformers, Hugging Face
- **Tuần 11-12**: Fine-tuning, Text-to-SQL (dự án)

### Tháng 3: Computer Vision & Advanced
- **Tuần 13-14**: Computer Vision cơ bản, CNN
- **Tuần 15-16**: Object Detection, Image Classification
- **Tuần 17-18**: Deployment, Production, Tối ưu



---

# THÁNG 1: MACHINE LEARNING & DEEP LEARNING CƠ BẢN

## 🗓️ TUẦN 1-2: Python & Data Science Foundations

### 📚 Kiến thức cần học

#### 1. Python Cơ bản (nếu chưa vững)
- Variables, Data types, Functions
- Lists, Dictionaries, Tuples
- Loops, Conditionals
- Classes, OOP basics

#### 2. NumPy - Tính toán số học

```python
import numpy as np

# Tạo array
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4]])

# Operations
print(arr * 2)           # [2, 4, 6, 8, 10]
print(arr.mean())        # 3.0
print(matrix.shape)      # (2, 2)

# Indexing & Slicing
print(arr[0:3])          # [1, 2, 3]
print(matrix[0, 1])      # 2

# Broadcasting
arr + 10                 # [11, 12, 13, 14, 15]

# Linear Algebra
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])
print(np.dot(a, b))      # Matrix multiplication
```

#### 3. Pandas - Xử lý dữ liệu bảng

```python
import pandas as pd

# Đọc dữ liệu
df = pd.read_csv('data.csv')
df = pd.read_excel('data.xlsx')

# Xem dữ liệu
print(df.head())         # 5 dòng đầu
print(df.info())         # Thông tin columns
print(df.describe())     # Thống kê

# Filtering
df[df['age'] > 30]
df[df['name'] == 'John']

# Grouping
df.groupby('city')['salary'].mean()

# Missing values
df.isnull().sum()
df.fillna(0)
df.dropna()

# Ví dụ với Family Tree data
members_df = pd.read_sql("SELECT * FROM thanhvien", connection)
print(members_df['ngheNghiep'].value_counts())
print(members_df.groupby('doiThuoc').size())
```



#### 4. Matplotlib & Seaborn - Visualization

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Line plot
plt.plot([1, 2, 3, 4], [1, 4, 9, 16])
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.title('My Plot')
plt.show()

# Bar chart
df['ngheNghiep'].value_counts().plot(kind='bar')
plt.title('Nghề nghiệp trong gia phả')
plt.show()

# Histogram
plt.hist(df['age'], bins=20)
plt.show()

# Heatmap
sns.heatmap(df.corr(), annot=True)
plt.show()
```

### 🎯 BÀI TẬP TUẦN 1-2

**Bài 1: Phân tích dữ liệu Family Tree**
```python
# Kết nối database và phân tích
import pandas as pd
import mysql.connector

# 1. Load dữ liệu thanhvien
# 2. Tính tuổi trung bình theo đời
# 3. Vẽ biểu đồ phân bố nghề nghiệp
# 4. Tìm người lớn tuổi nhất mỗi đời
# 5. Phân tích tỷ lệ nam/nữ
```

**Bài 2: Data Cleaning**
```python
# 1. Tìm và xử lý missing values trong thanhvien
# 2. Chuẩn hóa số điện thoại (format 10 số)
# 3. Tách năm sinh từ ngaySinh
# 4. Tạo column 'age' từ ngaySinh
# 5. Export ra CSV
```

### 📖 Tài liệu tham khảo

1. **NumPy**
   - Official Tutorial: https://numpy.org/doc/stable/user/quickstart.html
   - Video: "NumPy Tutorial" by freeCodeCamp (1h)

2. **Pandas**
   - Official Tutorial: https://pandas.pydata.org/docs/getting_started/intro_tutorials/
   - Video: "Pandas Tutorial" by Corey Schafer (playlist)

3. **Matplotlib**
   - Official Tutorial: https://matplotlib.org/stable/tutorials/index.html

---


## 🗓️ TUẦN 3-4: Machine Learning với Scikit-learn

### 📚 Kiến thức cần học

#### 1. Machine Learning Cơ bản

**3 loại ML:**
1. **Supervised Learning** (Học có giám sát)
   - Classification: Phân loại (spam/not spam)
   - Regression: Dự đoán số (giá nhà)

2. **Unsupervised Learning** (Học không giám sát)
   - Clustering: Phân nhóm
   - Dimensionality Reduction: Giảm chiều

3. **Reinforcement Learning** (Học tăng cường)
   - Agent học qua reward/penalty

#### 2. Quy trình ML chuẩn

```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# 1. Load data
X = df[['feature1', 'feature2', 'feature3']]
y = df['target']

# 2. Split train/test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 3. Preprocessing
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 4. Train model
model = LogisticRegression()
model.fit(X_train_scaled, y_train)

# 5. Predict
y_pred = model.predict(X_test_scaled)

# 6. Evaluate
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
print(classification_report(y_test, y_pred))
```

#### 3. Các thuật toán cơ bản

**A. Linear Regression (Hồi quy tuyến tính)**

```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Dự đoán tuổi dựa vào đời
X = df[['doiThuoc']]
y = df['age']

model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print(f"MSE: {mean_squared_error(y_test, y_pred)}")
print(f"R2 Score: {r2_score(y_test, y_pred)}")
```

**B. Logistic Regression (Phân loại)**

```python
from sklearn.linear_model import LogisticRegression

# Dự đoán giới tính dựa vào tên
X = df[['name_features']]  # Cần feature engineering
y = df['gioiTinh']

model = LogisticRegression()
model.fit(X_train, y_train)
accuracy = model.score(X_test, y_test)
```

**C. Decision Tree (Cây quyết định)**

```python
from sklearn.tree import DecisionTreeClassifier
from sklearn import tree
import matplotlib.pyplot as plt

model = DecisionTreeClassifier(max_depth=3)
model.fit(X_train, y_train)

# Visualize tree
plt.figure(figsize=(20,10))
tree.plot_tree(model, filled=True, feature_names=X.columns)
plt.show()
```

**D. Random Forest (Rừng ngẫu nhiên)**

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Feature importance
importances = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)
print(importances)
```

**E. K-Means Clustering (Phân nhóm)**

```python
from sklearn.cluster import KMeans

# Phân nhóm thành viên theo tuổi và nghề nghiệp
X = df[['age', 'ngheNghiep_encoded']]

kmeans = KMeans(n_clusters=3, random_state=42)
df['cluster'] = kmeans.fit_predict(X)

# Visualize
plt.scatter(df['age'], df['ngheNghiep_encoded'], c=df['cluster'])
plt.xlabel('Age')
plt.ylabel('Occupation')
plt.show()
```



#### 4. Evaluation Metrics (Đánh giá model)

```python
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)

# Classification metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

print(f"Accuracy: {accuracy:.2f}")
print(f"Precision: {precision:.2f}")
print(f"Recall: {recall:.2f}")
print(f"F1-Score: {f1:.2f}")

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d')
plt.show()

# Regression metrics
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)
```

### 🎯 BÀI TẬP TUẦN 3-4

**Bài 1: Dự đoán nghề nghiệp**
```python
# Dự đoán nghề nghiệp dựa vào:
# - Trình độ học vấn
# - Đời thứ
# - Nơi sinh
# 
# Yêu cầu:
# 1. Feature engineering (encode categorical)
# 2. Train 3 models: Logistic Regression, Decision Tree, Random Forest
# 3. So sánh accuracy
# 4. Vẽ confusion matrix
# 5. Feature importance
```

**Bài 2: Phân nhóm thành viên**
```python
# Sử dụng K-Means để phân nhóm thành viên theo:
# - Tuổi
# - Số con
# - Đời thứ
#
# Yêu cầu:
# 1. Chuẩn hóa dữ liệu
# 2. Tìm số cluster tối ưu (Elbow method)
# 3. Visualize clusters
# 4. Phân tích đặc điểm mỗi cluster
```

**Bài 3: Dự đoán tuổi thọ**
```python
# Dự đoán tuổi thọ (ngayMat - ngaySinh) dựa vào:
# - Nghề nghiệp
# - Nơi sinh
# - Trình độ học vấn
#
# Yêu cầu:
# 1. Linear Regression
# 2. Random Forest Regression
# 3. So sánh MSE, RMSE, R2
# 4. Plot predicted vs actual
```

### 📖 Tài liệu tham khảo

1. **Scikit-learn**
   - Official Tutorial: https://scikit-learn.org/stable/tutorial/index.html
   - User Guide: https://scikit-learn.org/stable/user_guide.html

2. **Courses**
   - Andrew Ng - Machine Learning (Coursera) - HIGHLY RECOMMENDED
   - StatQuest with Josh Starmer (YouTube) - Giải thích trực quan

3. **Books**
   - "Hands-On Machine Learning" by Aurélien Géron
   - "Python Machine Learning" by Sebastian Raschka

---


## 🗓️ TUẦN 5-6: Deep Learning với PyTorch

### 📚 Kiến thức cần học

#### 1. Neural Networks Cơ bản

**Kiến trúc:**
```
Input Layer → Hidden Layers → Output Layer
```

**Forward Propagation:**
```
z = W·x + b
a = activation(z)
```

**Backpropagation:**
- Tính gradient của loss theo weights
- Update weights: W = W - learning_rate * gradient

#### 2. PyTorch Basics

```python
import torch
import torch.nn as nn
import torch.optim as optim

# 1. Tensors (giống NumPy arrays)
x = torch.tensor([1.0, 2.0, 3.0])
y = torch.tensor([[1, 2], [3, 4]])

# Operations
print(x + 2)
print(y.shape)
print(y.T)  # Transpose

# GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
x = x.to(device)

# Autograd (tự động tính gradient)
x = torch.tensor([2.0], requires_grad=True)
y = x ** 2
y.backward()
print(x.grad)  # dy/dx = 2x = 4
```

#### 3. Xây dựng Neural Network

```python
import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, output_size)
        self.sigmoid = nn.Sigmoid()
    
    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        x = self.sigmoid(x)
        return x

# Khởi tạo
model = SimpleNN(input_size=10, hidden_size=20, output_size=1)
print(model)
```

#### 4. Training Loop

```python
# Chuẩn bị dữ liệu
from torch.utils.data import DataLoader, TensorDataset

X_train_tensor = torch.FloatTensor(X_train.values)
y_train_tensor = torch.FloatTensor(y_train.values)

train_dataset = TensorDataset(X_train_tensor, y_train_tensor)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)

# Model, Loss, Optimizer
model = SimpleNN(input_size=10, hidden_size=20, output_size=1)
criterion = nn.BCELoss()  # Binary Cross Entropy
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
num_epochs = 100
for epoch in range(num_epochs):
    model.train()
    total_loss = 0
    
    for batch_X, batch_y in train_loader:
        # Forward pass
        outputs = model(batch_X)
        loss = criterion(outputs, batch_y)
        
        # Backward pass
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()
    
    if (epoch + 1) % 10 == 0:
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {total_loss/len(train_loader):.4f}')

# Evaluation
model.eval()
with torch.no_grad():
    X_test_tensor = torch.FloatTensor(X_test.values)
    predictions = model(X_test_tensor)
    predictions = (predictions > 0.5).float()
    accuracy = (predictions == torch.FloatTensor(y_test.values)).float().mean()
    print(f'Test Accuracy: {accuracy:.4f}')
```



#### 5. Activation Functions

```python
import torch.nn.functional as F

# ReLU (Rectified Linear Unit)
x = torch.tensor([-2.0, -1.0, 0.0, 1.0, 2.0])
print(F.relu(x))  # [0, 0, 0, 1, 2]

# Sigmoid (0 to 1)
print(torch.sigmoid(x))  # [0.12, 0.27, 0.5, 0.73, 0.88]

# Tanh (-1 to 1)
print(torch.tanh(x))  # [-0.96, -0.76, 0, 0.76, 0.96]

# Softmax (for multi-class)
logits = torch.tensor([2.0, 1.0, 0.1])
print(F.softmax(logits, dim=0))  # [0.66, 0.24, 0.10]
```

#### 6. Loss Functions

```python
# Binary Classification
criterion = nn.BCELoss()  # Binary Cross Entropy
criterion = nn.BCEWithLogitsLoss()  # BCE + Sigmoid

# Multi-class Classification
criterion = nn.CrossEntropyLoss()  # Softmax + NLL

# Regression
criterion = nn.MSELoss()  # Mean Squared Error
criterion = nn.L1Loss()   # Mean Absolute Error
```

#### 7. Optimizers

```python
# SGD (Stochastic Gradient Descent)
optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

# Adam (Adaptive Moment Estimation) - Most popular
optimizer = optim.Adam(model.parameters(), lr=0.001)

# RMSprop
optimizer = optim.RMSprop(model.parameters(), lr=0.001)

# Learning rate scheduler
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=30, gamma=0.1)
```

#### 8. Regularization (Tránh overfitting)

```python
# Dropout
class NNWithDropout(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 20)
        self.dropout = nn.Dropout(0.5)  # Drop 50% neurons
        self.fc2 = nn.Linear(20, 1)
    
    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x

# Batch Normalization
class NNWithBatchNorm(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 20)
        self.bn1 = nn.BatchNorm1d(20)
        self.fc2 = nn.Linear(20, 1)
    
    def forward(self, x):
        x = self.fc1(x)
        x = self.bn1(x)
        x = F.relu(x)
        x = self.fc2(x)
        return x

# Weight Decay (L2 regularization)
optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-5)
```

### 🎯 BÀI TẬP TUẦN 5-6

**Bài 1: Binary Classification với PyTorch**
```python
# Dự đoán giới tính từ features
# Input: hoTen (encoded), ngheNghiep (encoded), doiThuoc
# Output: gioiTinh (0/1)
#
# Yêu cầu:
# 1. Xây dựng NN với 2 hidden layers
# 2. Sử dụng ReLU activation
# 3. Train 100 epochs
# 4. Plot training loss
# 5. Đánh giá accuracy, precision, recall
```

**Bài 2: Multi-class Classification**
```python
# Phân loại nghề nghiệp (5 classes)
# Input: trinhDoHocVan, doiThuoc, noiSinh
# Output: ngheNghiep (0-4)
#
# Yêu cầu:
# 1. One-hot encode output
# 2. Sử dụng CrossEntropyLoss
# 3. Thử nghiệm với Dropout
# 4. Learning rate scheduling
# 5. Confusion matrix
```

**Bài 3: Regression với PyTorch**
```python
# Dự đoán số con của một người
# Input: age, ngheNghiep, trinhDoHocVan
# Output: số con (continuous)
#
# Yêu cầu:
# 1. MSE Loss
# 2. Batch Normalization
# 3. Early stopping
# 4. Plot predicted vs actual
```

### 📖 Tài liệu tham khảo

1. **PyTorch**
   - Official Tutorial: https://pytorch.org/tutorials/
   - 60 Minute Blitz: https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html

2. **Courses**
   - "Deep Learning Specialization" by Andrew Ng (Coursera)
   - "Practical Deep Learning for Coders" by fast.ai

3. **Videos**
   - "PyTorch Tutorial" by Aladdin Persson (YouTube)
   - "Neural Networks from Scratch" by 3Blue1Brown

4. **Books**
   - "Deep Learning with PyTorch" by Eli Stevens
   - "Deep Learning" by Ian Goodfellow (advanced)

---


# THÁNG 2: NATURAL LANGUAGE PROCESSING (NLP)

## 🗓️ TUẦN 7-8: NLP Cơ bản

### 📚 Kiến thức cần học

#### 1. Text Preprocessing

```python
import re
import string
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer

# Download NLTK data
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

# 1. Lowercase
text = "Nguyễn Văn A là con của Nguyễn Văn B"
text = text.lower()

# 2. Remove punctuation
text = text.translate(str.maketrans('', '', string.punctuation))

# 3. Tokenization (tách từ)
tokens = word_tokenize(text)
print(tokens)  # ['nguyễn', 'văn', 'a', 'là', 'con', 'của', ...]

# 4. Remove stopwords
stop_words = set(stopwords.words('vietnamese'))
tokens = [w for w in tokens if w not in stop_words]

# 5. Stemming (cắt từ về gốc)
stemmer = PorterStemmer()
stemmed = [stemmer.stem(w) for w in tokens]

# 6. Lemmatization (về dạng gốc có nghĩa)
lemmatizer = WordNetLemmatizer()
lemmatized = [lemmatizer.lemmatize(w) for w in tokens]
```

#### 2. Text Representation

**A. Bag of Words (BoW)**

```python
from sklearn.feature_extraction.text import CountVectorizer

texts = [
    "Nguyễn Văn A là nông dân",
    "Nguyễn Văn B là giáo viên",
    "Trần Thị C là bác sĩ"
]

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

print(vectorizer.get_feature_names_out())
print(X.toarray())
# [[1, 0, 0, 1, 1, 1, 0, 0]
#  [0, 1, 0, 1, 1, 1, 0, 0]
#  [0, 0, 1, 0, 0, 1, 1, 1]]
```

**B. TF-IDF (Term Frequency - Inverse Document Frequency)**

```python
from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

print(X.toarray())
# Từ xuất hiện nhiều trong 1 doc nhưng ít trong các doc khác → TF-IDF cao
```

**C. Word Embeddings (Word2Vec)**

```python
from gensim.models import Word2Vec

# Corpus
sentences = [
    ['nguyễn', 'văn', 'a', 'nông', 'dân'],
    ['nguyễn', 'văn', 'b', 'giáo', 'viên'],
    ['trần', 'thị', 'c', 'bác', 'sĩ']
]

# Train Word2Vec
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, workers=4)

# Get vector
vector = model.wv['nguyễn']
print(vector.shape)  # (100,)

# Similar words
similar = model.wv.most_similar('nguyễn', topn=5)
print(similar)

# Save/Load
model.save("word2vec.model")
model = Word2Vec.load("word2vec.model")
```



#### 3. Text Classification

```python
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC

# Prepare data
questions = [
    "Có bao nhiêu người trong gia phả?",
    "Ai là con của Nguyễn Văn A?",
    "Nghề nghiệp của Trần Văn B là gì?",
    "Nguyễn Văn C sinh năm nào?"
]

labels = ['count', 'relationship', 'occupation', 'birth_year']

# Vectorize
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(questions)

# Train classifier
classifier = MultinomialNB()
classifier.fit(X, labels)

# Predict
new_question = "Có bao nhiêu người làm nông dân?"
X_new = vectorizer.transform([new_question])
prediction = classifier.predict(X_new)
print(prediction)  # ['count']
```

#### 4. Named Entity Recognition (NER)

```python
import spacy

# Load model
nlp = spacy.load("en_core_web_sm")

text = "Nguyễn Văn A sinh năm 1950 tại Hà Nội"
doc = nlp(text)

# Extract entities
for ent in doc.ents:
    print(f"{ent.text} - {ent.label_}")
# Nguyễn Văn A - PERSON
# 1950 - DATE
# Hà Nội - GPE (Geo-Political Entity)
```

#### 5. Sequence Models (RNN, LSTM)

```python
import torch
import torch.nn as nn

class LSTMClassifier(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, output_dim):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, output_dim)
    
    def forward(self, x):
        # x: (batch_size, seq_len)
        embedded = self.embedding(x)  # (batch_size, seq_len, embedding_dim)
        lstm_out, (hidden, cell) = self.lstm(embedded)
        # hidden: (1, batch_size, hidden_dim)
        output = self.fc(hidden.squeeze(0))
        return output

# Example usage
vocab_size = 10000
embedding_dim = 100
hidden_dim = 256
output_dim = 5  # 5 classes

model = LSTMClassifier(vocab_size, embedding_dim, hidden_dim, output_dim)
```

### 🎯 BÀI TẬP TUẦN 7-8

**Bài 1: Text Classification cho câu hỏi**
```python
# Phân loại câu hỏi về gia phả thành các loại:
# - count: Đếm số lượng
# - relationship: Quan hệ gia đình
# - personal_info: Thông tin cá nhân
# - occupation: Nghề nghiệp
# - location: Địa điểm
#
# Yêu cầu:
# 1. Tạo dataset 100 câu hỏi mẫu
# 2. TF-IDF vectorization
# 3. Train Naive Bayes, Logistic Regression, SVM
# 4. So sánh accuracy
# 5. Test với câu hỏi mới
```

**Bài 2: Named Entity Recognition**
```python
# Extract thông tin từ câu hỏi:
# - Tên người (PERSON)
# - Năm (DATE)
# - Địa điểm (LOCATION)
#
# Ví dụ: "Nguyễn Văn A sinh năm 1950 tại Hà Nội"
# → PERSON: Nguyễn Văn A, DATE: 1950, LOCATION: Hà Nội
#
# Yêu cầu:
# 1. Sử dụng spaCy hoặc regex
# 2. Xử lý 50 câu
# 3. Tính precision, recall
```

**Bài 3: Word Embeddings**
```python
# Train Word2Vec trên dữ liệu gia phả
# 1. Load tất cả text từ database (hoTen, ngheNghiep, noiSinh, etc.)
# 2. Preprocessing
# 3. Train Word2Vec
# 4. Tìm từ tương tự
# 5. Visualize embeddings với t-SNE
```

### 📖 Tài liệu tham khảo

1. **NLTK**
   - Official Book: https://www.nltk.org/book/
   - Tutorial: Natural Language Processing with Python

2. **spaCy**
   - Official Tutorial: https://spacy.io/usage/spacy-101

3. **Courses**
   - "Natural Language Processing Specialization" by DeepLearning.AI (Coursera)
   - "NLP with Python" by DataCamp

4. **Videos**
   - "NLP Tutorial" by Krish Naik (YouTube)
   - "Stanford CS224N: NLP with Deep Learning"

---


## 🗓️ TUẦN 9-10: Transformers & Hugging Face

### 📚 Kiến thức cần học

#### 1. Transformer Architecture

**Kiến trúc:**
```
Input Text
    ↓
Tokenization
    ↓
Embedding + Positional Encoding
    ↓
Multi-Head Self-Attention
    ↓
Feed Forward Network
    ↓
Output
```

**Self-Attention:**
- Model học được mối quan hệ giữa các từ
- Ví dụ: "Nguyễn Văn A là con của Nguyễn Văn B"
  - "con" attention cao với "Nguyễn Văn A" và "Nguyễn Văn B"

**Các model Transformer phổ biến:**
- **BERT**: Bidirectional (đọc 2 chiều)
- **GPT**: Autoregressive (đọc trái → phải)
- **T5**: Text-to-Text (input text → output text)
- **Qwen**: Code-focused (dự án đang dùng)

#### 2. Hugging Face Transformers

**Cài đặt:**
```bash
pip install transformers torch
```

**3 thành phần chính:**

**A. Tokenizer**

```python
from transformers import AutoTokenizer

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-Coder-7B-Instruct")

# Encode
text = "Có bao nhiêu người trong gia phả?"
inputs = tokenizer(text, return_tensors="pt")

print(inputs)
# {
#   'input_ids': tensor([[123, 456, 789, ...]]),
#   'attention_mask': tensor([[1, 1, 1, ...]])
# }

# Decode
decoded = tokenizer.decode(inputs['input_ids'][0])
print(decoded)

# Batch encoding
texts = ["Câu 1", "Câu 2", "Câu 3"]
inputs = tokenizer(texts, padding=True, truncation=True, return_tensors="pt")
```

**B. Model**

```python
from transformers import AutoModelForCausalLM
import torch

# Load model
model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen2.5-Coder-7B-Instruct",
    cache_dir="./models",
    torch_dtype=torch.float16,  # Giảm memory
    device_map="auto"           # Auto GPU allocation
)

# Generate text
inputs = tokenizer("Viết code Python để", return_tensors="pt")
outputs = model.generate(
    **inputs,
    max_new_tokens=100,
    temperature=0.7,
    top_p=0.9
)

generated_text = tokenizer.decode(outputs[0])
print(generated_text)
```

**C. Pipeline (API đơn giản)**

```python
from transformers import pipeline

# Text generation
generator = pipeline("text-generation", model="gpt2")
result = generator("Hello, I am", max_length=30)
print(result[0]['generated_text'])

# Sentiment analysis
classifier = pipeline("sentiment-analysis")
result = classifier("I love this product!")
print(result)  # [{'label': 'POSITIVE', 'score': 0.99}]

# Question answering
qa = pipeline("question-answering")
context = "Nguyễn Văn A sinh năm 1950 tại Hà Nội"
question = "Nguyễn Văn A sinh năm nào?"
result = qa(question=question, context=context)
print(result)  # {'answer': '1950', 'score': 0.95}

# Translation
translator = pipeline("translation_en_to_fr")
result = translator("Hello, how are you?")
print(result)  # [{'translation_text': 'Bonjour, comment allez-vous?'}]
```



#### 3. Generation Parameters

```python
outputs = model.generate(
    input_ids,
    max_new_tokens=512,        # Số tokens tối đa sinh ra
    max_length=1024,           # Tổng length (input + output)
    
    # Sampling strategies
    do_sample=True,            # Bật sampling (random)
    temperature=0.7,           # 0=deterministic, 1=creative
    top_k=50,                  # Chỉ xét 50 tokens có prob cao nhất
    top_p=0.9,                 # Nucleus sampling (top 90% cumulative prob)
    
    # Beam search
    num_beams=4,               # Beam search (tìm sequence tốt nhất)
    early_stopping=True,
    
    # Penalties
    repetition_penalty=1.2,    # Phạt lặp lại
    length_penalty=1.0,        # Khuyến khích/phạt độ dài
    
    # Special tokens
    pad_token_id=tokenizer.pad_token_id,
    eos_token_id=tokenizer.eos_token_id
)
```

#### 4. Ứng dụng trong dự án Text-to-SQL

**File: `ai-service/model_loader.py`**

```python
class ModelLoader:
    _instance = None
    _model = None
    _tokenizer = None
    
    def load_model(self):
        # Singleton pattern - chỉ load 1 lần
        if self._model is not None:
            return self._model, self._tokenizer
        
        # Load tokenizer
        self._tokenizer = AutoTokenizer.from_pretrained(
            MODEL_NAME,
            cache_dir=MODEL_CACHE_DIR,
            trust_remote_code=True
        )
        
        # Load model
        if DEVICE == "cuda" and torch.cuda.is_available():
            self._model = AutoModelForCausalLM.from_pretrained(
                MODEL_NAME,
                cache_dir=MODEL_CACHE_DIR,
                torch_dtype=torch.float16,
                device_map="auto",
                trust_remote_code=True
            )
        else:
            self._model = AutoModelForCausalLM.from_pretrained(
                MODEL_NAME,
                cache_dir=MODEL_CACHE_DIR,
                trust_remote_code=True
            )
        
        return self._model, self._tokenizer
```

**File: `ai-service/prompt_builder.py`**

```python
class PromptBuilder:
    def build_prompt(self, question):
        # Few-shot learning
        examples = "\n".join([
            f"Question: {ex['question']}\nSQL: {ex['sql']}\n"
            for ex in FEW_SHOT_EXAMPLES
        ])
        
        prompt = f"""You are a SQL expert. Convert Vietnamese questions to SQL queries.

Database Schema:
{DATABASE_SCHEMA}

Examples:
{examples}

Question: {question}
SQL:"""
        
        return prompt
```

**File: `ai-service/sql_generator.py`**

```python
class SQLGenerator:
    def generate_sql(self, question):
        # 1. Build prompt
        prompt = self.prompt_builder.build_prompt(question)
        
        # 2. Tokenize
        inputs = self.tokenizer(prompt, return_tensors="pt")
        device = next(self.model.parameters()).device
        inputs = {k: v.to(device) for k, v in inputs.items()}
        
        # 3. Generate
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_new_tokens=512,
                temperature=0.1,      # Low = more deterministic
                top_p=0.9,
                do_sample=True,
                pad_token_id=self.tokenizer.eos_token_id
            )
        
        # 4. Decode
        generated_text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # 5. Extract SQL
        sql = self._extract_sql(generated_text, prompt)
        
        return sql
```



### 🎯 BÀI TẬP TUẦN 9-10

**Bài 1: Text Generation với GPT-2**
```python
# Sinh văn bản tiếp theo
# Input: "Nguyễn Văn A là"
# Output: "Nguyễn Văn A là nông dân, sinh năm 1950..."
#
# Yêu cầu:
# 1. Load GPT-2 model
# 2. Generate với temperature khác nhau (0.1, 0.5, 1.0)
# 3. So sánh kết quả
# 4. Thử top_k và top_p
```

**Bài 2: Question Answering**
```python
# Trả lời câu hỏi từ context
# Context: Thông tin từ database (tieuSu của thành viên)
# Question: "Nguyễn Văn A làm nghề gì?"
#
# Yêu cầu:
# 1. Sử dụng pipeline("question-answering")
# 2. Test với 20 câu hỏi
# 3. Đánh giá accuracy
```

**Bài 3: Text-to-SQL cơ bản**
```python
# Xây dựng Text-to-SQL đơn giản
# Input: "Có bao nhiêu người?"
# Output: "SELECT COUNT(*) FROM thanhvien"
#
# Yêu cầu:
# 1. Tạo 20 examples (few-shot)
# 2. Build prompt template
# 3. Generate SQL với Qwen/GPT
# 4. Validate SQL syntax
# 5. Test accuracy
```

### 📖 Tài liệu tham khảo

1. **Hugging Face**
   - Documentation: https://huggingface.co/docs/transformers
   - Course: https://huggingface.co/learn/nlp-course
   - Models: https://huggingface.co/models

2. **Transformers**
   - "Attention Is All You Need" paper
   - "The Illustrated Transformer" by Jay Alammar
   - "Transformers from Scratch" by Peter Bloem

3. **Videos**
   - "Hugging Face Tutorial" by Abhishek Thakur
   - "Transformers Explained" by StatQuest

---


## 🗓️ TUẦN 11-12: Fine-tuning & Text-to-SQL Project

### 📚 Kiến thức cần học

#### 1. Fine-tuning Methods

**A. Full Fine-tuning**
- Train toàn bộ parameters
- Cần GPU mạnh (7B model = ~28GB VRAM)
- Tốn thời gian

**B. LoRA (Low-Rank Adaptation) - Khuyên dùng!**
- Chỉ train một phần nhỏ parameters
- Giảm 90% memory
- Không làm hỏng model gốc

```python
from peft import LoraConfig, get_peft_model, TaskType
from transformers import AutoModelForCausalLM

# 1. Load base model
base_model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen2.5-Coder-7B-Instruct",
    torch_dtype=torch.float16,
    device_map="auto"
)

# 2. Configure LoRA
lora_config = LoraConfig(
    r=16,                           # Rank (8, 16, 32)
    lora_alpha=32,                  # Scaling factor
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)

# 3. Apply LoRA
model = get_peft_model(base_model, lora_config)
model.print_trainable_parameters()
# trainable params: 4M || all params: 7B || trainable%: 0.057%
```

#### 2. Prepare Training Data

```python
from datasets import Dataset

# Training data
train_data = [
    {
        "question": "Có bao nhiêu người trong gia phả?",
        "sql": "SELECT COUNT(*) FROM thanhvien WHERE dongHoId = ? AND active_flag = 1"
    },
    {
        "question": "Ai là con của Nguyễn Văn A?",
        "sql": "SELECT hoTen FROM thanhvien WHERE chaId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ?) AND dongHoId = ?"
    },
    # ... more examples
]

# Create dataset
dataset = Dataset.from_list(train_data)

# Tokenize
def tokenize_function(examples):
    prompts = [build_prompt(q) for q in examples['question']]
    targets = examples['sql']
    
    # Tokenize input
    model_inputs = tokenizer(prompts, max_length=512, truncation=True, padding="max_length")
    
    # Tokenize output
    labels = tokenizer(targets, max_length=128, truncation=True, padding="max_length")
    model_inputs["labels"] = labels["input_ids"]
    
    return model_inputs

tokenized_dataset = dataset.map(tokenize_function, batched=True)
```

#### 3. Training với Trainer API

```python
from transformers import Trainer, TrainingArguments

# Training arguments
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    fp16=True,                      # Mixed precision
    logging_steps=10,
    save_steps=100,
    evaluation_strategy="steps",
    eval_steps=100,
    save_total_limit=3,
    warmup_steps=100,
    weight_decay=0.01,
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    tokenizer=tokenizer,
)

# Train
trainer.train()

# Save
model.save_pretrained("./fine-tuned-model")
tokenizer.save_pretrained("./fine-tuned-model")
```



#### 4. Few-shot Learning (Không cần fine-tune)

**Ưu điểm:**
- Không cần train
- Nhanh, dễ implement
- Dùng được ngay

**Nhược điểm:**
- Accuracy thấp hơn fine-tuning
- Phụ thuộc vào examples

```python
# File: ai-service/config.py
FEW_SHOT_EXAMPLES = [
    {"question": "Có bao nhiêu người?", "sql": "SELECT COUNT(*) FROM thanhvien WHERE dongHoId = ?"},
    {"question": "Ai là con của X?", "sql": "SELECT hoTen FROM thanhvien WHERE chaId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'X')"},
    # ... 10-20 examples
]

def build_prompt(question):
    examples_text = "\n".join([
        f"Q: {ex['question']}\nSQL: {ex['sql']}\n"
        for ex in FEW_SHOT_EXAMPLES
    ])
    
    prompt = f"""Convert Vietnamese question to SQL.

Database Schema:
{DATABASE_SCHEMA}

Examples:
{examples_text}

Q: {question}
SQL:"""
    
    return prompt
```

#### 5. Evaluation Metrics

```python
def evaluate_sql_generation(predictions, ground_truths):
    """
    Đánh giá Text-to-SQL
    """
    exact_match = 0
    execution_accuracy = 0
    
    for pred, gt in zip(predictions, ground_truths):
        # 1. Exact Match
        if normalize_sql(pred) == normalize_sql(gt):
            exact_match += 1
        
        # 2. Execution Accuracy (chạy SQL và so sánh kết quả)
        try:
            pred_result = execute_sql(pred)
            gt_result = execute_sql(gt)
            if pred_result == gt_result:
                execution_accuracy += 1
        except:
            pass
    
    return {
        'exact_match': exact_match / len(predictions),
        'execution_accuracy': execution_accuracy / len(predictions)
    }

def normalize_sql(sql):
    """Chuẩn hóa SQL để so sánh"""
    sql = sql.lower().strip()
    sql = re.sub(r'\s+', ' ', sql)
    return sql
```

### 🎯 BÀI TẬP TUẦN 11-12 (DỰ ÁN CHÍNH)

**Dự án: Hoàn thiện Text-to-SQL cho Family Tree**

**Phase 1: Data Preparation (2 ngày)**
```python
# 1. Tạo dataset 100 câu hỏi - SQL pairs
# 2. Chia train/val/test (70/15/15)
# 3. Phân tích distribution (loại câu hỏi)
# 4. Validate SQL syntax
```

**Phase 2: Few-shot Implementation (3 ngày)**
```python
# 1. Implement prompt builder
# 2. Chọn 15 examples tốt nhất
# 3. Test với validation set
# 4. Tính exact match & execution accuracy
# 5. Error analysis
```

**Phase 3: Fine-tuning với LoRA (4 ngày)**
```python
# 1. Setup LoRA config
# 2. Prepare training data
# 3. Train 3 epochs
# 4. Evaluate trên test set
# 5. So sánh với few-shot
```

**Phase 4: Integration & Deployment (5 ngày)**
```python
# 1. Tích hợp vào FastAPI service
# 2. Add caching
# 3. Error handling
# 4. Logging
# 5. Frontend integration
# 6. Testing end-to-end
```

**Deliverables:**
- [ ] Dataset 100 câu hỏi
- [ ] Few-shot implementation
- [ ] Fine-tuned model (optional)
- [ ] FastAPI service
- [ ] Frontend UI
- [ ] Documentation
- [ ] Test results report

### 📖 Tài liệu tham khảo

1. **Fine-tuning**
   - Hugging Face Fine-tuning Guide: https://huggingface.co/docs/transformers/training
   - PEFT Documentation: https://huggingface.co/docs/peft

2. **Text-to-SQL**
   - Spider Dataset: https://yale-lily.github.io/spider
   - WikiSQL: https://github.com/salesforce/WikiSQL
   - "Text-to-SQL" papers on arXiv

3. **Videos**
   - "Fine-tuning LLMs" by Weights & Biases
   - "LoRA Explained" by Efficient NLP

---


# THÁNG 3: COMPUTER VISION & ADVANCED TOPICS

## 🗓️ TUẦN 13-14: Computer Vision Cơ bản

### 📚 Kiến thức cần học

#### 1. Image Basics

```python
import cv2
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

# Load image
img = cv2.imread('photo.jpg')
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Image properties
print(img.shape)  # (height, width, channels)
print(img.dtype)  # uint8 (0-255)

# Display
plt.imshow(img_rgb)
plt.show()

# Resize
img_resized = cv2.resize(img, (224, 224))

# Crop
img_cropped = img[100:300, 100:300]

# Grayscale
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Blur
img_blur = cv2.GaussianBlur(img, (5, 5), 0)

# Edge detection
edges = cv2.Canny(img_gray, 100, 200)
```

#### 2. Image Preprocessing

```python
from torchvision import transforms
from PIL import Image

# Define transforms
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], 
                        std=[0.229, 0.224, 0.225])
])

# Apply
img = Image.open('photo.jpg')
img_tensor = transform(img)
print(img_tensor.shape)  # (3, 224, 224)
```

#### 3. Convolutional Neural Networks (CNN)

**Kiến trúc CNN:**
```
Input Image (224x224x3)
    ↓
Conv Layer + ReLU (filters extract features)
    ↓
Pooling Layer (reduce size)
    ↓
Conv Layer + ReLU
    ↓
Pooling Layer
    ↓
Flatten
    ↓
Fully Connected Layer
    ↓
Output (classes)
```

**Implement CNN với PyTorch:**

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super(SimpleCNN, self).__init__()
        # Convolutional layers
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        
        # Pooling
        self.pool = nn.MaxPool2d(2, 2)
        
        # Fully connected
        self.fc1 = nn.Linear(128 * 28 * 28, 512)
        self.fc2 = nn.Linear(512, num_classes)
        
        # Dropout
        self.dropout = nn.Dropout(0.5)
    
    def forward(self, x):
        # Conv block 1
        x = self.pool(F.relu(self.conv1(x)))  # 224 -> 112
        
        # Conv block 2
        x = self.pool(F.relu(self.conv2(x)))  # 112 -> 56
        
        # Conv block 3
        x = self.pool(F.relu(self.conv3(x)))  # 56 -> 28
        
        # Flatten
        x = x.view(-1, 128 * 28 * 28)
        
        # FC layers
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        
        return x

# Create model
model = SimpleCNN(num_classes=10)
print(model)
```



#### 4. Training CNN

```python
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# Prepare data
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

train_dataset = datasets.ImageFolder('data/train', transform=transform)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)

# Model, loss, optimizer
model = SimpleCNN(num_classes=len(train_dataset.classes))
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Training loop
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

num_epochs = 10
for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0
    
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        
        # Forward
        outputs = model(images)
        loss = criterion(outputs, labels)
        
        # Backward
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        # Statistics
        running_loss += loss.item()
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()
    
    epoch_loss = running_loss / len(train_loader)
    epoch_acc = 100 * correct / total
    print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {epoch_loss:.4f}, Acc: {epoch_acc:.2f}%')
```

#### 5. Transfer Learning (Khuyên dùng!)

**Tại sao dùng Transfer Learning?**
- Model đã train trên ImageNet (1M images)
- Học được features tổng quát (edges, textures, shapes)
- Chỉ cần fine-tune cho task cụ thể
- Tiết kiệm thời gian và data

```python
from torchvision import models

# Load pre-trained ResNet
model = models.resnet50(pretrained=True)

# Freeze all layers
for param in model.parameters():
    param.requires_grad = False

# Replace last layer
num_features = model.fc.in_features
model.fc = nn.Linear(num_features, num_classes)

# Only train last layer
optimizer = torch.optim.Adam(model.fc.parameters(), lr=0.001)

# Or fine-tune all layers with small lr
for param in model.parameters():
    param.requires_grad = True
optimizer = torch.optim.Adam(model.parameters(), lr=0.0001)
```

**Popular pre-trained models:**
```python
# ResNet (Residual Networks)
model = models.resnet18(pretrained=True)
model = models.resnet50(pretrained=True)

# VGG
model = models.vgg16(pretrained=True)

# EfficientNet
model = models.efficientnet_b0(pretrained=True)

# Vision Transformer (ViT)
from transformers import ViTForImageClassification
model = ViTForImageClassification.from_pretrained('google/vit-base-patch16-224')
```

### 🎯 BÀI TẬP TUẦN 13-14

**Bài 1: Image Classification - Phân loại ảnh thành viên**
```python
# Phân loại ảnh thành viên theo:
# - Nam/Nữ
# - Độ tuổi (trẻ em, thanh niên, trung niên, cao tuổi)
#
# Yêu cầu:
# 1. Tạo dataset từ ảnh trong database
# 2. Train CNN từ scratch
# 3. Transfer learning với ResNet
# 4. So sánh accuracy
# 5. Confusion matrix
```

**Bài 2: Face Detection**
```python
# Detect khuôn mặt trong ảnh gia đình
# Sử dụng OpenCV Haar Cascade hoặc MTCNN
#
# Yêu cầu:
# 1. Load ảnh từ database
# 2. Detect faces
# 3. Crop và save faces
# 4. Count số người trong ảnh
```

**Bài 3: Image Augmentation**
```python
# Tăng cường dữ liệu ảnh
# 1. Random flip, rotation, crop
# 2. Color jitter
# 3. Gaussian blur
# 4. Tạo 5 versions cho mỗi ảnh
# 5. Visualize augmentations
```

### 📖 Tài liệu tham khảo

1. **OpenCV**
   - Official Tutorial: https://docs.opencv.org/master/d9/df8/tutorial_root.html
   - "OpenCV Python Tutorial" by freeCodeCamp

2. **PyTorch Vision**
   - torchvision docs: https://pytorch.org/vision/stable/index.html
   - Transfer Learning Tutorial: https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html

3. **Courses**
   - "Convolutional Neural Networks" by Andrew Ng (Coursera)
   - "Deep Learning for Computer Vision" by Stanford (CS231n)

4. **Books**
   - "Deep Learning for Computer Vision" by Rajalingappaa Shanmugamani

---


## 🗓️ TUẦN 15-16: Object Detection & Advanced CV

### 📚 Kiến thức cần học

#### 1. Object Detection

**Khác biệt với Classification:**
- **Classification**: "Đây là con mèo" (1 label)
- **Object Detection**: "Có 2 con mèo ở vị trí (x1,y1,x2,y2) và (x3,y3,x4,y4)" (multiple objects + bounding boxes)

**Popular models:**
- **YOLO (You Only Look Once)**: Fast, real-time
- **Faster R-CNN**: Accurate but slower
- **SSD (Single Shot Detector)**: Balance speed/accuracy

#### 2. YOLO với Ultralytics

```python
from ultralytics import YOLO
import cv2

# Load pre-trained model
model = YOLO('yolov8n.pt')  # nano (fastest)
# model = YOLO('yolov8s.pt')  # small
# model = YOLO('yolov8m.pt')  # medium
# model = YOLO('yolov8l.pt')  # large

# Detect objects
results = model('image.jpg')

# Process results
for result in results:
    boxes = result.boxes
    for box in boxes:
        # Bounding box
        x1, y1, x2, y2 = box.xyxy[0]
        
        # Confidence
        conf = box.conf[0]
        
        # Class
        cls = box.cls[0]
        class_name = model.names[int(cls)]
        
        print(f"{class_name}: {conf:.2f} at ({x1},{y1},{x2},{y2})")

# Visualize
annotated = results[0].plot()
cv2.imshow('Detection', annotated)
cv2.waitKey(0)
```

#### 3. Fine-tune YOLO cho custom dataset

```python
from ultralytics import YOLO

# Prepare dataset structure:
# dataset/
#   ├── images/
#   │   ├── train/
#   │   └── val/
#   └── labels/
#       ├── train/
#       └── val/

# Create data.yaml
"""
train: dataset/images/train
val: dataset/images/val
nc: 2  # number of classes
names: ['person', 'face']
"""

# Load model
model = YOLO('yolov8n.pt')

# Train
results = model.train(
    data='data.yaml',
    epochs=100,
    imgsz=640,
    batch=16,
    name='family_detection'
)

# Validate
metrics = model.val()

# Predict
results = model.predict('test_image.jpg')
```

#### 4. Face Recognition

```python
import face_recognition
import cv2

# Load image
image = face_recognition.load_image_file("family_photo.jpg")

# Find faces
face_locations = face_recognition.face_locations(image)
face_encodings = face_recognition.face_encodings(image, face_locations)

print(f"Found {len(face_locations)} faces")

# Compare faces
known_image = face_recognition.load_image_file("nguyen_van_a.jpg")
known_encoding = face_recognition.face_encodings(known_image)[0]

for face_encoding in face_encodings:
    matches = face_recognition.compare_faces([known_encoding], face_encoding)
    if matches[0]:
        print("Found Nguyễn Văn A!")
```

#### 5. Image Segmentation

```python
from transformers import SegformerForSemanticSegmentation, SegformerImageProcessor
from PIL import Image

# Load model
processor = SegformerImageProcessor.from_pretrained("nvidia/segformer-b0-finetuned-ade-512-512")
model = SegformerForSemanticSegmentation.from_pretrained("nvidia/segformer-b0-finetuned-ade-512-512")

# Process image
image = Image.open("photo.jpg")
inputs = processor(images=image, return_tensors="pt")

# Predict
outputs = model(**inputs)
logits = outputs.logits

# Get segmentation map
predicted_segmentation_map = processor.post_process_semantic_segmentation(outputs, target_sizes=[image.size[::-1]])[0]
```



### 🎯 BÀI TẬP TUẦN 15-16

**Bài 1: Face Detection trong ảnh gia đình**
```python
# Detect tất cả khuôn mặt trong ảnh gia đình
# 1. Load ảnh từ database
# 2. Detect faces với YOLO hoặc MTCNN
# 3. Crop và save từng face
# 4. Tạo bounding boxes
# 5. Count số người
```

**Bài 2: Face Recognition**
```python
# Nhận diện thành viên trong ảnh
# 1. Tạo face encodings cho mỗi thành viên
# 2. Load ảnh mới
# 3. Detect và recognize faces
# 4. Label tên người
# 5. Tính accuracy
```

**Bài 3: Auto-tag ảnh**
```python
# Tự động gắn tag cho ảnh
# Input: Ảnh gia đình
# Output: Tags (số người, sự kiện, địa điểm)
#
# 1. Object detection (người, vật)
# 2. Scene classification (trong nhà/ngoài trời)
# 3. Face recognition (tên người)
# 4. Save tags vào database
```

### 📖 Tài liệu tham khảo

1. **YOLO**
   - Ultralytics Docs: https://docs.ultralytics.com/
   - YOLOv8 Tutorial: https://github.com/ultralytics/ultralytics

2. **Face Recognition**
   - face_recognition library: https://github.com/ageitgey/face_recognition
   - DeepFace: https://github.com/serengil/deepface

3. **Courses**
   - "Object Detection" by Andrew Ng
   - "Advanced Computer Vision" by Stanford

---

## 🗓️ TUẦN 17-18: Deployment & Production

### 📚 Kiến thức cần học

#### 1. Model Optimization

**A. Quantization (Giảm kích thước model)**

```python
import torch

# Dynamic Quantization
model_quantized = torch.quantization.quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)

# Size comparison
torch.save(model.state_dict(), 'model.pth')
torch.save(model_quantized.state_dict(), 'model_quantized.pth')
# Original: 500MB → Quantized: 125MB
```

**B. Pruning (Loại bỏ weights không quan trọng)**

```python
import torch.nn.utils.prune as prune

# Prune 30% of weights
prune.l1_unstructured(model.fc1, name='weight', amount=0.3)

# Remove pruning
prune.remove(model.fc1, 'weight')
```

**C. ONNX Export (Tương thích nhiều framework)**

```python
import torch.onnx

# Export to ONNX
dummy_input = torch.randn(1, 3, 224, 224)
torch.onnx.export(
    model,
    dummy_input,
    "model.onnx",
    export_params=True,
    opset_version=11,
    input_names=['input'],
    output_names=['output']
)

# Load ONNX
import onnxruntime as ort
session = ort.InferenceSession("model.onnx")
outputs = session.run(None, {'input': input_data})
```

#### 2. FastAPI Deployment (Đã implement trong dự án)

```python
from fastapi import FastAPI, File, UploadFile
from PIL import Image
import io

app = FastAPI()

# Load model once
model = load_model()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read image
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))
    
    # Preprocess
    image_tensor = transform(image).unsqueeze(0)
    
    # Predict
    with torch.no_grad():
        output = model(image_tensor)
        prediction = torch.argmax(output, dim=1).item()
    
    return {"prediction": prediction}

@app.get("/health")
async def health():
    return {"status": "ok"}
```



#### 3. Docker Deployment

```dockerfile
# Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy code
COPY . .

# Expose port
EXPOSE 7000

# Run
CMD ["python", "main.py"]
```

```bash
# Build
docker build -t ai-service .

# Run
docker run -p 7000:7000 ai-service
```

#### 4. Caching & Performance

```python
from functools import lru_cache
import redis

# In-memory cache
@lru_cache(maxsize=1000)
def get_prediction(image_hash):
    return model.predict(image_hash)

# Redis cache
redis_client = redis.Redis(host='localhost', port=6379)

def predict_with_cache(image):
    # Generate hash
    image_hash = hashlib.md5(image.tobytes()).hexdigest()
    
    # Check cache
    cached = redis_client.get(image_hash)
    if cached:
        return json.loads(cached)
    
    # Predict
    result = model.predict(image)
    
    # Save to cache
    redis_client.setex(image_hash, 3600, json.dumps(result))
    
    return result
```

#### 5. Monitoring & Logging

```python
import logging
from prometheus_client import Counter, Histogram
import time

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Metrics
prediction_counter = Counter('predictions_total', 'Total predictions')
prediction_duration = Histogram('prediction_duration_seconds', 'Prediction duration')

@app.post("/predict")
async def predict(file: UploadFile):
    start_time = time.time()
    
    try:
        # Predict
        result = model.predict(image)
        
        # Metrics
        prediction_counter.inc()
        prediction_duration.observe(time.time() - start_time)
        
        # Log
        logger.info(f"Prediction: {result}, Duration: {time.time() - start_time:.2f}s")
        
        return result
    
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise
```

### 🎯 BÀI TẬP TUẦN 17-18 (DỰ ÁN CUỐI)

**Dự án: Face Recognition Service cho Family Tree**

**Requirements:**
1. Detect faces trong ảnh upload
2. Recognize thành viên
3. Auto-tag ảnh
4. RESTful API
5. Caching
6. Docker deployment

**Phase 1: Model Development (3 ngày)**
```python
# 1. Collect face images từ database
# 2. Train face recognition model
# 3. Evaluate accuracy
# 4. Optimize model (quantization)
```

**Phase 2: API Development (3 ngày)**
```python
# 1. FastAPI endpoints:
#    - POST /detect-faces
#    - POST /recognize-faces
#    - POST /auto-tag
# 2. Image upload handling
# 3. Response formatting
# 4. Error handling
```

**Phase 3: Optimization (2 ngày)**
```python
# 1. Redis caching
# 2. Batch processing
# 3. Async processing
# 4. Load testing
```

**Phase 4: Deployment (3 ngày)**
```python
# 1. Dockerfile
# 2. Docker Compose (AI service + Redis)
# 3. Integration với backend
# 4. Frontend UI
# 5. Testing
```

**Phase 5: Documentation (3 ngày)**
```python
# 1. API documentation (Swagger)
# 2. Setup guide
# 3. Architecture diagram
# 4. Performance report
```

### 📖 Tài liệu tham khảo

1. **Deployment**
   - FastAPI Docs: https://fastapi.tiangolo.com/
   - Docker Tutorial: https://docs.docker.com/get-started/

2. **Optimization**
   - PyTorch Quantization: https://pytorch.org/docs/stable/quantization.html
   - ONNX Runtime: https://onnxruntime.ai/

3. **Production ML**
   - "Designing Machine Learning Systems" by Chip Huyen
   - "Machine Learning Engineering" by Andriy Burkov

---


# KIẾN TRÚC AI TRONG DỰ ÁN FAMILY TREE

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js)                       │
│                         Port 3000                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  AI Chat UI  │  │  Face Upload │  │  Auto-tag UI │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY (Express)                       │
│                         Port 8080                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Authentication, Rate Limiting, CORS                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Node.js)                           │
│                         Port 6001                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ AI Query     │  │ Face Recog   │  │ Member CRUD  │          │
│  │ Service      │  │ Service      │  │ Service      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
         ↓                    ↓
┌──────────────────┐  ┌──────────────────┐
│   AI SERVICE     │  │   CV SERVICE     │
│   (Python)       │  │   (Python)       │
│   Port 7000      │  │   Port 7001      │
│                  │  │                  │
│ ┌──────────────┐ │  │ ┌──────────────┐ │
│ │ Qwen Model   │ │  │ │ YOLO Model   │ │
│ │ Text-to-SQL  │ │  │ │ Face Recog   │ │
│ └──────────────┘ │  │ └──────────────┘ │
└──────────────────┘  └──────────────────┘
         ↓                    ↓
┌─────────────────────────────────────────┐
│         DATABASE (MySQL)                 │
│         Port 3306                        │
│  ┌────────────────────────────────────┐ │
│  │ thanhvien, quanhe, sukien, etc.   │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## 📁 Project Structure

```
project/
├── FE/tree/                          # Frontend (Next.js)
│   ├── app/(full-page)/ai-chat/     # AI Chat UI
│   ├── service/aiQuery.service.ts   # API calls
│   └── ...
│
├── api-gateway/                      # API Gateway (Express)
│   ├── config/gateway.config.yml    # Routes config
│   └── plugins/                     # Auth plugins
│
├── myFamilyTree/                     # Backend (Node.js)
│   ├── src/
│   │   ├── services/
│   │   │   ├── aiQueryService.ts    # AI integration
│   │   │   └── thanhVienService.ts  # Member CRUD
│   │   ├── controllers/
│   │   └── routes/
│   └── ...
│
├── ai-service/                       # AI Service (Python)
│   ├── config.py                    # Config & examples
│   ├── model_loader.py              # Load Hugging Face model
│   ├── prompt_builder.py            # Build prompts
│   ├── sql_generator.py             # Generate SQL
│   ├── query_executor.py            # Execute SQL
│   ├── main.py                      # FastAPI server
│   └── requirements.txt
│
├── cv-service/                       # Computer Vision (Future)
│   ├── face_detection.py
│   ├── face_recognition.py
│   └── main.py
│
└── database/
    ├── tree_v26.sql                 # Database schema
    └── relationship_sync_procedures.sql
```



## 🔄 Data Flow - Text-to-SQL

### 1. User asks question

```typescript
// Frontend: FE/tree/app/(full-page)/ai-chat/page.tsx
const handleAsk = async () => {
  const response = await askAIQuestion(question, user.dongHoId);
  setResult(response.data);
};
```

### 2. Frontend → Backend

```typescript
// Frontend: FE/tree/service/aiQuery.service.ts
export const askAIQuestion = async (question: string, dongHoId: string) => {
  const response = await api.post('/ai/query', { question, dongHoId });
  return response;
};
```

### 3. Backend → AI Service

```typescript
// Backend: myFamilyTree/src/services/aiQueryService.ts
async askQuestion(question: string, dongHoId: string) {
  const response = await axios.post(`${AI_SERVICE_URL}/query`, {
    question,
    dongHoId,
    execute: true
  });
  return response.data;
}
```

### 4. AI Service processes

```python
# AI Service: ai-service/main.py
@app.post("/query")
async def process_query(request: QueryRequest):
    # 1. Generate SQL
    result = sql_generator.generate_sql(request.question)
    sql = result["sql"]
    
    # 2. Execute SQL
    params = [request.dongHoId] * sql.count('?')
    exec_result = query_executor.execute_query(sql, params)
    
    return {
        "sql": sql,
        "data": exec_result["data"],
        "columns": exec_result["columns"]
    }
```

### 5. SQL Generation

```python
# AI Service: ai-service/sql_generator.py
def generate_sql(self, question):
    # 1. Build prompt with few-shot examples
    prompt = self.prompt_builder.build_prompt(question)
    
    # 2. Tokenize
    inputs = self.tokenizer(prompt, return_tensors="pt")
    
    # 3. Generate with Qwen model
    outputs = self.model.generate(
        **inputs,
        max_new_tokens=512,
        temperature=0.1,
        top_p=0.9
    )
    
    # 4. Decode
    generated_text = self.tokenizer.decode(outputs[0])
    
    # 5. Extract SQL
    sql = self._extract_sql(generated_text)
    
    return sql
```

### 6. Execute SQL

```python
# AI Service: ai-service/query_executor.py
def execute_query(self, sql, params):
    connection = mysql.connector.connect(**DB_CONFIG)
    cursor = connection.cursor(dictionary=True)
    
    cursor.execute(sql, params)
    results = cursor.fetchall()
    
    return {
        "data": results,
        "columns": list(results[0].keys()) if results else []
    }
```

### 7. Return to Frontend

```typescript
// Frontend displays results
{result.results.map((row, idx) => (
  <tr key={idx}>
    {result.columns.map(col => (
      <td key={col}>{row[col]}</td>
    ))}
  </tr>
))}
```



## 🎓 Key Learnings từ Dự án

### 1. Hugging Face Model Loading

```python
# Singleton pattern để load model 1 lần
class ModelLoader:
    _instance = None
    _model = None
    _tokenizer = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelLoader, cls).__new__(cls)
        return cls._instance
```

**Lesson**: Load model nặng (7B parameters) chỉ 1 lần khi startup, reuse cho mọi requests.

### 2. Few-shot Learning

```python
FEW_SHOT_EXAMPLES = [
    {"question": "Có bao nhiêu người?", "sql": "SELECT COUNT(*) FROM thanhvien"},
    {"question": "Ai là con của X?", "sql": "SELECT hoTen FROM thanhvien WHERE chaId = ..."},
    # ... 10-15 examples
]
```

**Lesson**: Không cần fine-tune, chỉ cần 10-15 examples tốt đã có kết quả khá.

### 3. Prompt Engineering

```python
prompt = f"""You are a SQL expert. Convert Vietnamese questions to SQL.

Database Schema:
{DATABASE_SCHEMA}

Examples:
{examples}

Question: {question}
SQL:"""
```

**Lesson**: Prompt structure quan trọng: Schema → Examples → Question → Output format.

### 4. Temperature Control

```python
outputs = model.generate(
    temperature=0.1,  # Low = deterministic, good for SQL
    top_p=0.9
)
```

**Lesson**: SQL generation cần deterministic (temperature thấp), creative writing cần temperature cao.

### 5. Microservices Architecture

```
Frontend (3000) → Gateway (8080) → Backend (6001) → AI Service (7000)
```

**Lesson**: Tách AI service riêng → dễ scale, deploy, maintain.

---


# TÀI NGUYÊN HỌC TẬP

## 📚 Courses (Khuyên dùng)

### Machine Learning
1. **Machine Learning by Andrew Ng** (Coursera) ⭐⭐⭐⭐⭐
   - Link: https://www.coursera.org/learn/machine-learning
   - Thời gian: 11 weeks
   - Miễn phí audit

2. **Python for Data Science** (DataCamp)
   - Link: https://www.datacamp.com/tracks/python-programmer
   - Hands-on exercises

### Deep Learning
1. **Deep Learning Specialization** by Andrew Ng (Coursera) ⭐⭐⭐⭐⭐
   - 5 courses: Neural Networks, Optimization, Structuring ML Projects, CNN, RNN
   - Link: https://www.coursera.org/specializations/deep-learning

2. **Practical Deep Learning for Coders** (fast.ai) ⭐⭐⭐⭐⭐
   - Link: https://course.fast.ai/
   - Top-down approach, code-first
   - Miễn phí

### NLP
1. **Natural Language Processing Specialization** (Coursera)
   - Link: https://www.coursera.org/specializations/natural-language-processing

2. **Hugging Face Course** ⭐⭐⭐⭐⭐
   - Link: https://huggingface.co/learn/nlp-course
   - Miễn phí, hands-on
   - Transformers, fine-tuning

### Computer Vision
1. **CS231n: Convolutional Neural Networks** (Stanford) ⭐⭐⭐⭐⭐
   - Link: http://cs231n.stanford.edu/
   - Video lectures on YouTube
   - Assignments available

## 📖 Books

### Beginner
1. **"Hands-On Machine Learning"** by Aurélien Géron ⭐⭐⭐⭐⭐
   - Scikit-learn, Keras, TensorFlow
   - Practical examples

2. **"Python Machine Learning"** by Sebastian Raschka
   - Comprehensive, code examples

### Intermediate
1. **"Deep Learning with PyTorch"** by Eli Stevens
   - PyTorch fundamentals
   - Computer Vision, NLP examples

2. **"Natural Language Processing with Transformers"** by Lewis Tunstall
   - Hugging Face ecosystem
   - Fine-tuning, deployment

### Advanced
1. **"Deep Learning"** by Ian Goodfellow
   - Theoretical foundations
   - Math-heavy

2. **"Designing Machine Learning Systems"** by Chip Huyen
   - Production ML
   - System design

## 🎥 YouTube Channels

1. **StatQuest with Josh Starmer** ⭐⭐⭐⭐⭐
   - Giải thích trực quan, dễ hiểu
   - ML, DL, Statistics

2. **3Blue1Brown**
   - Neural Networks series
   - Math visualization

3. **Sentdex**
   - Python, ML, DL tutorials
   - Hands-on projects

4. **Krish Naik**
   - ML, DL, NLP tutorials
   - End-to-end projects

5. **Yannic Kilcher**
   - Paper reviews
   - Advanced topics

## 🌐 Websites & Platforms

1. **Kaggle** (https://www.kaggle.com)
   - Competitions
   - Datasets
   - Notebooks
   - Learn section

2. **Papers with Code** (https://paperswithcode.com)
   - Latest research papers
   - Code implementations
   - Benchmarks

3. **Hugging Face** (https://huggingface.co)
   - Models
   - Datasets
   - Spaces (demos)

4. **Google Colab** (https://colab.research.google.com)
   - Free GPU
   - Jupyter notebooks

## 📝 Practice Platforms

1. **LeetCode** - Coding practice
2. **HackerRank** - ML/AI challenges
3. **Kaggle Competitions** - Real-world problems
4. **DrivenData** - Social impact competitions

## 🔧 Tools & Libraries

### Essential
```bash
# Data Science
pip install numpy pandas matplotlib seaborn

# Machine Learning
pip install scikit-learn

# Deep Learning
pip install torch torchvision
pip install tensorflow

# NLP
pip install transformers datasets
pip install nltk spacy

# Computer Vision
pip install opencv-python pillow
pip install ultralytics  # YOLO
```

### Development
```bash
# Jupyter
pip install jupyter notebook

# Experiment tracking
pip install wandb mlflow

# Deployment
pip install fastapi uvicorn
pip install docker
```



---

# 📊 LEARNING SCHEDULE - 3 THÁNG

## Tháng 1: ML & DL Foundations

| Tuần | Chủ đề | Thời gian/ngày | Bài tập |
|------|--------|----------------|---------|
| 1-2 | Python, NumPy, Pandas | 2-3h | Phân tích Family Tree data |
| 3-4 | Scikit-learn, ML Algorithms | 3-4h | Dự đoán nghề nghiệp, phân nhóm |
| 5-6 | PyTorch, Neural Networks | 3-4h | Binary/Multi-class classification |

**Mục tiêu cuối tháng:**
- [ ] Thành thạo NumPy, Pandas
- [ ] Hiểu 5 thuật toán ML cơ bản
- [ ] Xây dựng được Neural Network với PyTorch
- [ ] Hoàn thành 6 bài tập

## Tháng 2: NLP & Transformers

| Tuần | Chủ đề | Thời gian/ngày | Bài tập |
|------|--------|----------------|---------|
| 7-8 | NLP basics, Text preprocessing | 2-3h | Text classification, NER |
| 9-10 | Transformers, Hugging Face | 3-4h | Text generation, QA |
| 11-12 | Fine-tuning, Text-to-SQL | 4-5h | **DỰ ÁN CHÍNH** |

**Mục tiêu cuối tháng:**
- [ ] Hiểu Transformer architecture
- [ ] Sử dụng được Hugging Face
- [ ] Hoàn thành Text-to-SQL project
- [ ] Deploy AI service

## Tháng 3: Computer Vision & Production

| Tuần | Chủ đề | Thời gian/ngày | Bài tập |
|------|--------|----------------|---------|
| 13-14 | CNN, Transfer Learning | 3-4h | Image classification |
| 15-16 | Object Detection, Face Recognition | 3-4h | Face detection/recognition |
| 17-18 | Deployment, Optimization | 4-5h | **DỰ ÁN CUỐI** |

**Mục tiêu cuối tháng:**
- [ ] Hiểu CNN architecture
- [ ] Implement face recognition
- [ ] Deploy CV service
- [ ] Hoàn thành 2 dự án lớn

---

# 🎯 MILESTONES

## Milestone 1: ML Fundamentals (Tuần 4)
- ✅ Phân tích dữ liệu với Pandas
- ✅ Train 3 ML models
- ✅ Evaluate và compare models
- ✅ Visualize results

## Milestone 2: Deep Learning (Tuần 6)
- ✅ Build Neural Network từ scratch
- ✅ Train trên GPU
- ✅ Implement regularization
- ✅ Achieve >80% accuracy

## Milestone 3: Text-to-SQL (Tuần 12)
- ✅ Dataset 100 câu hỏi
- ✅ Few-shot implementation
- ✅ FastAPI service
- ✅ Frontend integration
- ✅ >70% execution accuracy

## Milestone 4: Face Recognition (Tuần 18)
- ✅ Face detection model
- ✅ Face recognition system
- ✅ Auto-tagging feature
- ✅ Docker deployment
- ✅ Complete documentation

---

# 💡 TIPS HỌC TẬP

## 1. Học theo dự án
- Đừng chỉ học lý thuyết
- Áp dụng ngay vào Family Tree project
- Mỗi concept học → implement ngay

## 2. Code mỗi ngày
- Ít nhất 1-2 giờ/ngày
- Consistency > Intensity
- GitHub streak

## 3. Đọc code người khác
- Kaggle notebooks
- GitHub repositories
- Hugging Face models

## 4. Tham gia cộng đồng
- Reddit: r/MachineLearning, r/learnmachinelearning
- Discord: Hugging Face, fast.ai
- Stack Overflow

## 5. Làm bài tập
- Không skip bài tập
- Tự tạo thêm bài tập
- Chia sẻ code lên GitHub

## 6. Đọc papers
- Bắt đầu từ blog posts
- Sau đó đọc papers
- Implement papers

## 7. Track progress
- Notion/Obsidian để ghi chú
- GitHub để lưu code
- Blog để chia sẻ

---

# 🚀 NEXT STEPS

## Sau 3 tháng, bạn có thể:

### 1. Nâng cao kỹ năng
- [ ] Học Reinforcement Learning
- [ ] Generative AI (GANs, Diffusion Models)
- [ ] MLOps (Kubernetes, CI/CD)
- [ ] Distributed Training

### 2. Chứng chỉ
- [ ] TensorFlow Developer Certificate
- [ ] AWS Machine Learning Specialty
- [ ] Google Professional ML Engineer

### 3. Dự án mở rộng
- [ ] Chatbot với RAG (Retrieval Augmented Generation)
- [ ] Recommendation system
- [ ] Time series forecasting
- [ ] Multi-modal AI (text + image)

### 4. Đóng góp open source
- [ ] Contribute to Hugging Face
- [ ] Create own models
- [ ] Write tutorials

### 5. Career
- [ ] Build portfolio
- [ ] Apply for ML Engineer positions
- [ ] Freelance AI projects

---

# 📞 SUPPORT

Nếu gặp khó khăn:
1. Google error message
2. Stack Overflow
3. GitHub Issues
4. Discord communities
5. Ask ChatGPT/Claude

**Remember**: Everyone struggles at first. Keep coding! 💪

---

**Created**: January 2026
**Last Updated**: January 2026
**Author**: AI Learning Roadmap for Family Tree Project
**Version**: 1.0

