def convert_to_onehot(y):
    columns = ['neutralne', 'oczekiwanie', 'podziw', 'radosc', 'smutek', 'strach', 'wstret', 'zaskoczenie', 'zlosc']
    return [1 if col == y else 0 for col in columns]