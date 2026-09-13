import { render, screen } from "@testing-library/react";
import Student from "./Student";

describe("Student Component", () => {
  test("should render student information", () => {
    render(
      <Student
        name="Shraddha"
        course="M.Sc. Computer Applications"
        semester="3"
      />
    );

    expect(screen.getByText("Student Information")).toBeInTheDocument();
    expect(screen.getByText("Name: Shraddha")).toBeInTheDocument();
    expect(
      screen.getByText("Course: M.Sc. Computer Applications")
    ).toBeInTheDocument();
    expect(screen.getByText("Semester: 3")).toBeInTheDocument();
  });

  test("should match snapshot", () => {
    const { container } = render(
      <Student
        name="Shraddha"
        course="M.Sc. Computer Applications"
        semester="3"
      />
    );

    expect(container).toMatchSnapshot();
  });
});
