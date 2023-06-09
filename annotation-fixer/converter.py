import json
import csv
from pathlib import Path
from fix import add_text_to_highlights
from make_csv import create_csv_list


def read_json(file_path: str):
    """
    Quick helper to read a file path into a dictionary.
    """
    with open(file_path, "r+") as the_path:
        return json.load(the_path)


def results_to_csv(results_path: str, extract_path: str) -> None:
    results = read_json(results_path)
    extract = read_json(extract_path)
    add_text_to_highlights(results, extract)
    stem = Path(results_path).stem
    csv_name = f"{stem}.csv"
    csv_list = create_csv_list(results)
    print([x[0] for x in csv_list])
    with open(csv_name, "w+") as the_csv:
        writer = csv.writer(the_csv)
        writer.writerows(csv_list)


if __name__ == "__main__":
    results_to_csv("./example/incorrect-results.json", "./example/incorrect-extract.json")
