#!/usr/bin/env python3


def flat_list_to_bounding_boxes(numbers: list[float]) -> list[list[float]]:
    """
    Convert a flat list of numbers that are quadpoints into a list of lists that are bounding boxes.
    """
    quadpoints = [numbers[i : i + 8] for i in range(0, len(numbers), 8)]
    bounding_boxes = []
    for quadpoint in quadpoints:
        x_coordinates = [quadpoint[i] for i in range(0, len(quadpoint), 2)]
        y_coordinates = [quadpoint[i] for i in range(1, len(quadpoint), 2)]
        min_x = min(x_coordinates)
        max_x = max(x_coordinates)
        min_y = min(y_coordinates)
        max_y = max(y_coordinates)
        bounding_box = [min_x, min_y, max_x, max_y]
        bounding_boxes.append(bounding_box)
    return bounding_boxes


def do_overlap(bbox1: list[float], bbox2: list[float]) -> bool:
    """
    Determine whether two bounding boxes overlap.
    """
    return all(
        [
            bbox1[2] >= bbox2[0],  # bbox1 right edge >= bbox2 left edge
            bbox1[0] <= bbox2[2],  # bbox1 left edge <= bbox2 right edge
            bbox1[3] >= bbox2[1],  # bbox1 bottom edge >= bbox2 top edge
            bbox1[1] <= bbox2[3],  # bbox1 top edge <= bbox2 bottom edge
        ]
    )


def combine_bounding_boxes(bounding_boxes: list[list[float]]) -> list[float]:
    """
    Combine several bounding boxes into one bounding box.
    """
    min_x = min(bbox[0] for bbox in bounding_boxes)
    min_y = min(bbox[1] for bbox in bounding_boxes)
    max_x = max(bbox[2] for bbox in bounding_boxes)
    max_y = max(bbox[3] for bbox in bounding_boxes)
    combined_bbox = [min_x, min_y, max_x, max_y]
    return combined_bbox


def characters_on_page(extract_api: dict, page: int) -> list:
    """
    Get all of the words on the page given an extract api response and a page.
    """
    output = []
    for element in extract_api["elements"]:
        if not "Page" in element or element["Page"] != page:
            continue
        if "Kids" in element:
            child_words = characters_on_page(element["Kids"], page)
            output.extend(child_words)
        if "Text" in element and "CharBounds" in element:
            for i, char in enumerate(element["Text"]):
                output.append({"letter": char, "bbox": element["CharBounds"][i]})
    return output


def characters_to_words(characters: list) -> list:
    """
    Take a list of characters and transform them into words.
    """
    output = []
    cur_chars = []
    for character in characters:
        if character["letter"] != " ":
            cur_chars.append(character)
        else:
            res = {
                "word": "".join([char["letter"] for char in cur_chars]),
                "bbox": combine_bounding_boxes([char["bbox"] for char in cur_chars]),
            }
            output.append(res)
            output.append({"word": " ", "bbox": character["bbox"]})
            cur_chars = []
    if len(cur_chars) > 0:
        res = {
            "word": "".join([char["letter"] for char in cur_chars]),
            "bbox": combine_bounding_boxes([char["bbox"] for char in cur_chars]),
        }
        output.append(res)
    return output


def words_on_page(extract_api: dict, page: int) -> list:
    """
    Take the extract API and a page and get all of the words on that page.
    """
    characters = characters_on_page(extract_api, page)
    return characters_to_words(characters)


def text_overlapping_quadpoints(
    quad_points: list[float], page: int, extract_api: dict
) -> str:
    """
    Find the text that overlaps with the provided quadPoints based on the
    information inside the extract API.
    """
    output = ""
    highlight_bounding_boxes = flat_list_to_bounding_boxes(quad_points)
    page_words = words_on_page(extract_api, page)
    for word in page_words:
        if any([do_overlap(word["bbox"], bbox) for bbox in highlight_bounding_boxes]):
            output += word["word"]
    return output.strip()


def insert_body_text(annotation: dict, extract_api: dict) -> None:
    """
    Insert body text into the annotation provided based on the content of the extract API.
    """
    quad_points = annotation["target"]["selector"]["quadPoints"]
    page = annotation["target"]["selector"]["node"]["index"]
    annotation["body_value"] = text_overlapping_quadpoints(
        quad_points, page, extract_api
    )


def response_annotations(response: dict) -> list[dict]:
    """
    Walk through the user response and get all of the annotations within it.
    """
    annotations = []
    pages = response["results"]["content"][response["group"]]["pages"]
    for page in pages:
        tasks = page["tasks"]
        for task in tasks:
            if task["tag"] != "highlights":
                continue
            annotations.extend(task["user_response"])
    return annotations


def add_text_to_highlights(responses: list[dict], extract_api: dict) -> list[dict]:
    """
    For every provided response, add body text to the annotations contained within it.
    """
    for response in responses:
        for annotation in response_annotations(response):
            insert_body_text(annotation, extract_api)
    return responses
