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
        code="""
        console.log(
            'button: click!',
            this.toString()
        )
        """
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

checkbox_group.js_on_change(
    "active",
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

radio_group.js_on_change(
    "active",
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


# -----------------------------
# Display all widgets
# -----------------------------

layout = column(
    button,
    checkbox_group,
    radio_group,
    slider,
    dropdown
)

show(layout)