import json


def create_csv_list(results: list[dict]) -> list[list[str]]:
    """
    Walk through the results from the application and create a nice CSV.
    """
    output = [
        [
            "id",
            "group",
            "page_id",
            "page_instructions",
            "document_id",
            "page_layout",
            "task_id",
            "task_tag",
            "min_number",
            "max_number",
            "metadata",
            "user_response",
        ]
    ]
    for result in results:
        id = result["id"]
        group = result["group"]
        pages = result["results"]["content"][group]["pages"]
        for page in pages:
            page_id = page["id"]
            page_instructions = page["instructions"]
            document_id = page["document_id"]
            page_layout = page["page_layout"]
            for task in page["tasks"]:
                task_id = task["id"]
                task_tag = task["tag"]
                min_number = task["min_number"] if "min_number" in task else "N/A"
                max_number = task["max_number"] if "max_number" in task else "N/A"
                metadata = json.dumps(task["metadata"] if "metadata" in task else "N/A")
                if task["tag"] != "collection":
                    if not "user_response" in task:
                        breakpoint()
                    user_response = json.dumps(task["user_response"])
                    output.append(
                        [
                            group,
                            page_id,
                            page_instructions,
                            document_id,
                            page_layout,
                            task_id,
                            task_tag,
                            min_number,
                            max_number,
                            metadata,
                            user_response,
                        ]
                    )
                else:
                    for subtask in task["tasks"]:
                        task_id = subtask["id"]
                        task_tag = subtask["tag"]
                        task_id = task["id"]
                        task_tag = task["tag"]
                        min_number = (
                            task["min_number"] if "min_number" in task else "N/A"
                        )
                        max_number = (
                            task["max_number"] if "max_number" in task else "N/A"
                        )
                        metadata = json.dumps(
                            task["metadata"] if "metadata" in task else "N/A"
                        )
                        user_response = json.dumps(subtask["user_response"])
                        output.append(
                            [
                                id,
                                group,
                                page_id,
                                page_instructions,
                                document_id,
                                page_layout,
                                task_id,
                                task_tag,
                                min_number,
                                max_number,
                                metadata,
                                user_response,
                            ]
                        )
    return output
