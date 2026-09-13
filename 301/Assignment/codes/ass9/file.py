import os


files = {

"1.py": '''
from bokeh.plotting import figure, output_file, show


# file to save the model
output_file("hiding_legend.html")


# instantiating the figure object
graph = figure(title="Bokeh Hiding Legend")


# plotting the graph
graph.vbar(
    x=1,
    top=5,
    width=1,
    color="violet",
    legend_label="Violet Bar"
)

graph.vbar(
    x=2,
    top=5,
    width=1,
    color="green",
    legend_label="Green Bar"
)

graph.vbar(
    x=3,
    top=5,
    width=1,
    color="yellow",
    legend_label="Yellow Bar"
)

graph.vbar(
    x=4,
    top=5,
    width=1,
    color="red",
    legend_label="Red Bar"
)


# enable hiding of the glyphs
graph.legend.click_policy = "hide"


# displaying the model
show(graph)
''',


"2.py": '''
from bokeh.plotting import figure, output_file, show


# file to save the model
output_file("muting_legend.html")


# instantiating the figure object
graph = figure(title="Bokeh Muting Legend")


# plotting the graph
graph.vbar(
    x=1,
    top=5,
    width=1,
    color="violet",
    legend_label="Violet Bar",
    muted_alpha=0.2
)

graph.vbar(
    x=2,
    top=5,
    width=1,
    color="green",
    legend_label="Green Bar",
    muted_alpha=0.2
)

graph.vbar(
    x=3,
    top=5,
    width=1,
    color="yellow",
    legend_label="Yellow Bar",
    muted_alpha=0.2
)

graph.vbar(
    x=4,
    top=5,
    width=1,
    color="red",
    legend_label="Red Bar",
    muted_alpha=0.2
)


# enable muting of the glyphs
graph.legend.click_policy = "mute"


# displaying the model
show(graph)
''',


"3.py": '''
from bokeh.io import show
from bokeh.layouts import column
from bokeh.models import (
    Button,
    CheckboxGroup,
    CustomJS,
    RadioGroup,
    Slider,
    Dropdown
)


# -----------------------------
# Button
# -----------------------------

button = Button(label="GFG")

button.js_on_click(
    CustomJS(
        code="console.log('button: click!', this.toString())"
    )
)


# -----------------------------
# CheckboxGroup
# -----------------------------

labels = ["First", "Second", "Third"]

checkbox_group = CheckboxGroup(
    labels=labels,
    active=[0, 2]
)

checkbox_group.js_on_click(
    CustomJS(
        code="""
        console.log(
            'checkbox_group: active=' + this.active,
            this.toString()
        )
        """
    )
)


# -----------------------------
# RadioGroup
# -----------------------------

radio_group = RadioGroup(
    labels=labels,
    active=1
)

radio_group.js_on_click(
    CustomJS(
        code="""
        console.log(
            'radio_group: active=' + this.active,
            this.toString()
        )
        """
    )
)


# -----------------------------
# Slider
# -----------------------------

slider = Slider(
    start=1,
    end=20,
    value=1,
    step=2,
    title="Slider"
)

slider.js_on_change(
    "value",
    CustomJS(
        code="""
        console.log(
            'slider: value=' + this.value,
            this.toString()
        )
        """
    )
)


# -----------------------------
# Dropdown
# -----------------------------

menu = [
    ("First", "First"),
    ("Second", "Second"),
    ("Third", "Third")
]

dropdown = Dropdown(
    label="Dropdown Menu",
    button_type="success",
    menu=menu
)

dropdown.js_on_event(
    "menu_item_click",
    CustomJS(
        code="""
        console.log(
            'dropdown: ' + this.item,
            this.toString()
        )
        """
    )
)


# displaying all widgets
layout = column(
    button,
    checkbox_group,
    radio_group,
    slider,
    dropdown
)

show(layout)
''',


"4.py": '''
from bokeh.plotting import figure, show
from bokeh.models import TabPanel, Tabs


# -----------------------------
# First Plot
# -----------------------------

fig1 = figure(
    width=300,
    height=300,
    title="Tab 1"
)

x = [1, 2, 3, 4, 5]
y = [5, 4, 3, 2, 1]

fig1.line(
    x,
    y,
    line_color="green",
    line_width=2
)


# -----------------------------
# Second Plot
# -----------------------------

fig2 = figure(
    width=300,
    height=300,
    title="Tab 2"
)

fig2.line(
    y,
    x,
    line_color="red",
    line_width=2
)


# -----------------------------
# Creating Tabs
# -----------------------------

tab1 = TabPanel(
    child=fig1,
    title="Tab 1"
)

tab2 = TabPanel(
    child=fig2,
    title="Tab 2"
)

all_tabs = Tabs(
    tabs=[tab1, tab2]
)


# displaying the tabs
show(all_tabs)
'''

}


for filename, code in files.items():

    with open(filename, "w", encoding="utf-8") as file:
        file.write(code)


print("All Python files created successfully.")