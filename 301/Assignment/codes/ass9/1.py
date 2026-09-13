
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
