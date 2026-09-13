
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
