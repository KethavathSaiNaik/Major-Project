
# import os
# import json
# import torch
# from transformers import AutoTokenizer, AutoModelForSequenceClassification


# class DebertaNLI:
#     def __init__(self, model_path, max_length=512):
#         self.device = "cuda" if torch.cuda.is_available() else "cpu"

#         self.tokenizer = AutoTokenizer.from_pretrained(
#             model_path,
#             local_files_only=True
#         )
#         self.model = AutoModelForSequenceClassification.from_pretrained(
#             model_path,
#             local_files_only=True
#         ).to(self.device)

#         self.model.eval()
#         self.max_length = max_length

#         self.id2label = {
#             int(k): v for k, v in self.model.config.id2label.items()
#         }

#     def predict(self, claim, evidence_sentences):
#         # Combine claim + evidences into single sequence
#         text = " [SEP] ".join(
#             [claim.strip()] + [e.strip() for e in evidence_sentences]
#         )

#         inputs = self.tokenizer(
#             text,
#             return_tensors="pt",
#             truncation=True,
#             max_length=self.max_length,
#             padding=True
#         ).to(self.device)

#         with torch.no_grad():
#             outputs = self.model(**inputs)
#             probs = torch.softmax(outputs.logits, dim=-1)
#             pred_id = torch.argmax(probs, dim=-1).item()
#             confidence = probs[0][pred_id].item()

#         return self.id2label[pred_id], confidence


# def run_deberta_nli(query_id, claim, top_k=5):
#     fusion_path = f"outputs/fusion/final_ranked_sentences_{query_id}.json"

#     # Load fused top-ranked sentences
#     with open(fusion_path, "r", encoding="utf-8") as f:
#         fusion_data = json.load(f)

#     top_sentences = fusion_data["results"][:top_k]

#     evidence_texts = [s["sentence_text"] for s in top_sentences]
#     evidence_ids = [s["sentence_id"] for s in top_sentences]

#     # Run NLI
#     nli = DebertaNLI(model_path="Models/Model-1")
#     label, confidence = nli.predict(claim, evidence_texts)

#     # Save result to JSON (same behavior as before)
#     os.makedirs("outputs/inference", exist_ok=True)
#     out_path = f"outputs/inference/nli_results_{query_id}.json"

#     output_data = {
#         "query_id": query_id,
#         "claim": claim,
#         "label": label,
#         "confidence": confidence,
#         "used_sentence_ids": evidence_ids,
#         "num_evidence_used": len(evidence_texts)
#     }

#     with open(out_path, "w", encoding="utf-8") as f:
#         json.dump(output_data, f, indent=2, ensure_ascii=False)

#     print(f"🧠 DeBERTa NLI result saved to: {out_path}")

#     # ✅ CRITICAL FIX: RETURN RESULT FOR API
#     return {
#         "label": label,
#         "confidence": confidence,
#         "evidences": [
#             {
#                 "sentence_id": sid,
#                 "sentence_text": txt
#             }
#             for sid, txt in zip(evidence_ids, evidence_texts)
#         ]
#     }



# import os
# import json
# import torch
# from transformers import AutoTokenizer, AutoModelForSequenceClassification


# # =================================================
# # 🔹 DeBERTa NLI MODEL CLASS
# # =================================================
# class DebertaNLI:
#     def __init__(self, model_path, max_length=512):
#         self.device = "cuda" if torch.cuda.is_available() else "cpu"

#         print("🔄 Loading DeBERTa model...")
#         self.tokenizer = AutoTokenizer.from_pretrained(
#             model_path,
#             local_files_only=True
#         )
#         self.model = AutoModelForSequenceClassification.from_pretrained(
#             model_path,
#             local_files_only=True
#         ).to(self.device)

#         self.model.eval()
#         self.max_length = max_length

#         self.id2label = {
#             int(k): v for k, v in self.model.config.id2label.items()
#         }

#         print(f"✅ DeBERTa loaded on {self.device.upper()}")

#     def predict(self, claim, evidence_sentences):
#         # Combine claim + evidences into a single sequence
#         text = " [SEP] ".join(
#             [claim.strip()] + [e.strip() for e in evidence_sentences]
#         )

#         inputs = self.tokenizer(
#             text,
#             return_tensors="pt",
#             truncation=True,
#             max_length=self.max_length,
#             padding=True
#         ).to(self.device)

#         with torch.no_grad():
#             outputs = self.model(**inputs)
#             probs = torch.softmax(outputs.logits, dim=-1)
#             pred_id = torch.argmax(probs, dim=-1).item()
#             confidence = probs[0][pred_id].item()

#         return self.id2label[pred_id], confidence


# # =================================================
# # 🔹 LOAD MODEL ONCE (AT IMPORT TIME)
# # =================================================
# MODEL_PATH = "Models/Model-deberta-large"   # change to DeBERTa-large path if needed
# NLI_MODEL = DebertaNLI(model_path=MODEL_PATH, max_length=256)


# # =================================================
# # 🔹 RUN NLI (PER REQUEST)
# # =================================================
# def run_deberta_nli(query_id, claim, top_k=5):
#     fusion_path = f"outputs/fusion/final_ranked_sentences_{query_id}.json"

#     # Load fused top-ranked sentences
#     with open(fusion_path, "r", encoding="utf-8") as f:
#         fusion_data = json.load(f)

#     top_sentences = fusion_data["results"][:top_k]

#     evidence_texts = [s["sentence_text"] for s in top_sentences]
#     evidence_ids = [s["sentence_id"] for s in top_sentences]

#     # 🔹 USE PRELOADED MODEL
#     label, confidence = NLI_MODEL.predict(claim, evidence_texts)

#     # Save result to JSON (same behavior as before)
#     os.makedirs("outputs/inference", exist_ok=True)
#     out_path = f"outputs/inference/nli_results_{query_id}.json"

#     output_data = {
#         "query_id": query_id,
#         "claim": claim,
#         "label": label,
#         "confidence": confidence,
#         "used_sentence_ids": evidence_ids,
#         "num_evidence_used": len(evidence_texts)
#     }

#     with open(out_path, "w", encoding="utf-8") as f:
#         json.dump(output_data, f, indent=2, ensure_ascii=False)

#     print(f"🧠 DeBERTa NLI result saved to: {out_path}")

#     # Return result for API
#     return {
#         "label": label,
#         "confidence": confidence,
#         "evidences": [
#             {
#                 "sentence_id": sid,
#                 "sentence_text": txt
#             }
#             for sid, txt in zip(evidence_ids, evidence_texts)
#         ]
#     }




import os
import json
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification


# ============================================================
# 🔹 GENERIC NLI MODEL CLASS
# Handles loading + inference for any transformer NLI model
# ============================================================
class NLIModel:

    def __init__(self, name, model_path, max_length=256):

        self.name = name
        self.model_path = model_path
        self.max_length = max_length
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

        print(f"\n🔄 Loading {self.name} from: {model_path}")

        # Load tokenizer
        self.tokenizer = AutoTokenizer.from_pretrained(
            model_path,
            local_files_only=True
        )

        # Load model
        self.model = AutoModelForSequenceClassification.from_pretrained(
            model_path,
            local_files_only=True
        ).to(self.device)

        self.model.eval()

        # Label mapping
        self.id2label = {
            int(k): v for k, v in self.model.config.id2label.items()
        }

        print(f"✅ {self.name} loaded on {self.device.upper()}")


    # --------------------------------------------------------
    # Run inference and return probabilities
    # --------------------------------------------------------
    def predict(self, claim, evidences):

        combined_text = " [SEP] ".join(
            [claim.strip()] + [e.strip() for e in evidences]
        )

        inputs = self.tokenizer(
            combined_text,
            return_tensors="pt",
            truncation=True,
            max_length=self.max_length,
            padding=True
        ).to(self.device)

        with torch.no_grad():
            outputs = self.model(**inputs)
            probs = torch.softmax(outputs.logits, dim=-1)[0].cpu().numpy()

        pred_id = int(np.argmax(probs))
        label = self.id2label[pred_id]
        confidence = float(probs[pred_id])

        return {
            "label": label,
            "confidence": confidence,
            "probabilities": probs.tolist()
        }


# ============================================================
# 🔹 LOAD ALL MODELS ONCE
# ============================================================

MODEL_DEBERTA_BASE = NLIModel(
    name="DeBERTa-base",
    model_path="Models/Model-1"
)

MODEL_ROBERTA_BASE = NLIModel(
    name="RoBERTa-base",
    model_path="Models/Roberta-base"
)

MODEL_DEBERTA_LARGE = NLIModel(
    name="DeBERTa-large",
    model_path="Models/Model-deberta-large"
)


# ============================================================
# 🔹 ENSEMBLE WEIGHTS
# ============================================================

MODEL_WEIGHTS = {
    "DeBERTa-base": 0.3,
    "RoBERTa-base": 0.3,
    "DeBERTa-large": 0.4
}


# ============================================================
# 🔹 MAIN ENSEMBLE INFERENCE FUNCTION
# ============================================================

def run_deberta_nli(query_id, claim, top_k=5):

    print("\n=================================================")
    print(f"🧠 Running NLI Ensemble for Query: {query_id}")
    print("=================================================")

    fusion_file = f"outputs/fusion/final_ranked_sentences_{query_id}.json"

    # --------------------------------------------------------
    # Load retrieved evidence sentences
    # --------------------------------------------------------
    with open(fusion_file, "r", encoding="utf-8") as f:
        fusion_data = json.load(f)

    top_sentences = fusion_data["results"][:top_k]

    evidence_texts = [s["sentence_text"] for s in top_sentences]
    evidence_ids = [s["sentence_id"] for s in top_sentences]

    print("\n📄 Claim:")
    print(claim)

    print("\n📚 Evidence Sentences Used:")
    for i, ev in enumerate(evidence_texts, 1):
        print(f"{i}. {ev[:120]}...")

    # --------------------------------------------------------
    # Run each model sequentially
    # --------------------------------------------------------

    print("\n🔍 Running individual models...\n")

    results = {}

    results["DeBERTa-base"] = MODEL_DEBERTA_BASE.predict(claim, evidence_texts)
    results["RoBERTa-base"] = MODEL_ROBERTA_BASE.predict(claim, evidence_texts)
    results["DeBERTa-large"] = MODEL_DEBERTA_LARGE.predict(claim, evidence_texts)

    # --------------------------------------------------------
    # Print model decisions
    # --------------------------------------------------------

    for model_name, result in results.items():

        print(f"Model: {model_name}")
        print(f"Prediction : {result['label']}")
        print(f"Confidence : {result['confidence']:.4f}")
        print("-" * 40)

    # --------------------------------------------------------
    # Ensemble weighted probability fusion
    # --------------------------------------------------------

    print("\n⚖️ Performing weighted ensemble...")

    weighted_probs = np.zeros(3)

    for model_name, result in results.items():

        weight = MODEL_WEIGHTS[model_name]
        probs = np.array(result["probabilities"])

        weighted_probs += weight * probs

    final_pred_id = int(np.argmax(weighted_probs))
    final_confidence = float(weighted_probs[final_pred_id])

    id2label = MODEL_DEBERTA_BASE.id2label
    final_label = id2label[final_pred_id]

    print("\n🏆 Final Ensemble Decision")
    print(f"Label      : {final_label}")
    print(f"Confidence : {final_confidence:.4f}")

    # --------------------------------------------------------
    # Save detailed model predictions
    # --------------------------------------------------------

    os.makedirs("outputs/model_decisions", exist_ok=True)

    model_decision_path = f"outputs/model_decisions/model_predictions_{query_id}.json"

    with open(model_decision_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"\n📁 Model decision file saved:")
    print(model_decision_path)

    # --------------------------------------------------------
    # Save final ensemble output (same structure as before)
    # --------------------------------------------------------

    os.makedirs("outputs/inference", exist_ok=True)

    output_file = f"outputs/inference/nli_results_{query_id}.json"

    output_data = {
        "query_id": query_id,
        "claim": claim,
        "label": final_label,
        "confidence": final_confidence,
        "used_sentence_ids": evidence_ids,
        "num_evidence_used": len(evidence_texts)
    }

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)

    print(f"\n💾 Final ensemble result saved:")
    print(output_file)

    # --------------------------------------------------------
    # Return API response
    # --------------------------------------------------------

    return {
        "label": final_label,
        "confidence": final_confidence,
        "evidences": [
            {
                "sentence_id": sid,
                "sentence_text": txt
            }
            for sid, txt in zip(evidence_ids, evidence_texts)
        ]
    }