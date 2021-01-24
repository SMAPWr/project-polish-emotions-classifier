import twint
from os.path import join, dirname, realpath, abspath


def generate_csv_with_tweets_that_use_certain_hashtag(hashtag, since):
    """
    Function downloads tweets containing a particular hashtag and saves it as a .csv
    :param hashtag: simple string e.g. christmas (not #christmas)
    :param since: date, e.g. 2020-01-15
    :param save_dir: path to the folder where you want to save the csv, e.g. ./data/
    :return:  None
    """
    save_path = abspath(join(dirname(realpath(__file__)), f"{tag}_since_{since}.csv"))

    c = twint.Config()

    c.Since = since

    c.Search = f"#{hashtag}"

    c.Store_csv = True
    c.Output = save_path

    twint.run.Search(c)

    print(f"Saved tweets with {hashtag} as {save_path}")


if __name__ == '__main__':
    since = "2020-12-01"
    tag = "szczepionka"

    generate_csv_with_tweets_that_use_certain_hashtag(tag, since)
