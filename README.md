# POLEMIC
**POL**ish **EM**ot**I**ons **C**lassifier

### Quickstart

- Run from the main directory:
```shell
docker-compose up
```

- Copy token from console
- Go to `localhost:8001` and enter copied token to access notebooks
- Run `work/EDA-WUST-2k20-twitter-annotations.ipynb`
- Run `work/Create embedded train and test dataset.ipynb`
- Run `work/Classifier model.ipynb`

Baseline classifier results:
```
              precision    recall  f1-score   support

   neutralne       0.80      0.93      0.86       518
 oczekiwanie       0.20      0.07      0.11        28
      podziw       0.62      0.50      0.55        52
      radosc       0.52      0.41      0.46        83
      smutek       0.21      0.15      0.18        20
      strach       0.00      0.00      0.00        13
      wstret       0.11      0.08      0.10        24
 zaskoczenie       0.40      0.17      0.24        12
       zlosc       0.64      0.60      0.62        93

    accuracy                           0.72       843
   macro avg       0.39      0.32      0.35       843
weighted avg       0.67      0.72      0.69       843
```

# Phase 1 (18/12/2020)

Derivables:
- “Słowosieć” dataset
- base classifier

What was achieved:
- ...


# Phase 2 (21/12/2020)

Derivables:
- Evaluation, Model comparision

What was achieved:
- ...


# Phase 3 (25/01/2020)

Derivables:
- Model retrained at HuBert and Twitter datasets, 
- Twitter extension, 
- Trained classifier

What was achieved:
- ...
