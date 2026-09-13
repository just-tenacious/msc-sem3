
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
