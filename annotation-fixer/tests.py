import unittest
from fix import add_text_to_highlights
from converter import read_json


class TestStringMethods(unittest.TestCase):
    def test_first_highlight(self):
        res = add_text_to_highlights(
            read_json("./example/responses.json"), read_json("./example/extract.json")
        )
        actual = res[0]["results"]["content"]["0"]["pages"][0]["tasks"][6][
            "user_response"
        ][0]["body_value"]
        expected = "Our business exhibited strength and resiliency in Q1."
        self.assertEqual(actual, expected)

    def test_second_highlight(self):
        res = add_text_to_highlights(
            read_json("./example/responses.json"), read_json("./example/extract.json")
        )
        actual = res[0]["results"]["content"]["0"]["pages"][1]["tasks"][5][
            "user_response"
        ][0]["body_value"]
        expected = "Excluding the impact of FX,"
        self.assertEqual(actual, expected)


if __name__ == "__main__":
    unittest.main()
