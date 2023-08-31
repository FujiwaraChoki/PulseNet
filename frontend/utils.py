import shorten_url
from typing import List

def generate_url(selected_info: List[str], title: str):
    """Generates a URL based on the selected information types.

    Args:
        selected_info (List[str]): A list of information types selected by the user.
        title (str): The title of the page to be displayed.

    Returns:
        str: A shortened URL that can be used to retrieve the selected information.
    """
    url = f"http://localhost:8000/{title}?"
    for info in selected_info:
        url += f"{info}=1&"
    return shorten_url.short(url[:-1])