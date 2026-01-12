# 🔍 ClaimLens – Multi-Evidence Claim Verification System  

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![DeBERTa](https://img.shields.io/badge/DeBERTa-NLI-5A67D8?style=flat-square)
![NLP](https://img.shields.io/badge/NLP-Fact%20Verification-blue?style=flat-square)
![RAG](https://img.shields.io/badge/RAG-Retrieval--Augmented--Generation-green?style=flat-square)

---

## 🚀 Overview  

**ClaimLens** is a multi-evidence claim verification system that validates textual claims using dynamically retrieved evidence from trusted sources. The system follows a **Retrieval-Augmented Generation (RAG)** pipeline, enabling real-time evidence retrieval and reasoning rather than relying on static datasets.

A fine-tuned **DeBERTa-based Natural Language Inference (NLI)** model reasons over multiple evidence passages to classify claims into **Supported**, **Refuted**, or **Not Enough Information (NEI)**. To enhance transparency and trust, ClaimLens integrates **grounded question answering**, producing evidence-backed and source-attributed explanations for every prediction.

---

## 🧠 Features  

- **Multi-Evidence Claim Verification** – Aggregates and reasons over multiple retrieved evidence passages for robust factual validation.  
- **RAG-Based Evidence Retrieval** – Dynamically fetches relevant evidence from trusted sources at inference time.  
- **DeBERTa-Based NLI Model** – Fine-tuned to perform deep semantic reasoning for claim classification.  
- **Explainable AI** – Generates grounded, evidence-backed responses with explicit source attribution.  
- **Scalable & Modular Design** – Clean separation between retrieval, inference, and explanation components.

---

## 🧩 System Workflow  

1. Claim Input  
2. Evidence Retrieval (RAG Pipeline)  
3. Multi-Evidence Aggregation  
4. DeBERTa-Based NLI Reasoning  
5. Grounded Question Answering  
6. Final Verdict with Evidence Attribution  

---

## 🛠️ Tech Stack  

- **Language:** Python  
- **Deep Learning Framework:** PyTorch  
- **NLP Models:** DeBERTa (Transformers)  
- **Architecture:** Retrieval-Augmented Generation (RAG)  
- **Core Tasks:** Natural Language Inference, Evidence Retrieval, Explainable Question Answering  

---
