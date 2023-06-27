import React from "react";
import { render } from "@testing-library/react-native";

import VenueCard from "../src/components/Cards/VenueCard";

describe("VenueCard", () => {
  it("renders correctly", () => {
    const { getByText } = render(<VenueCard />);
    const element = getByText("Hello, World!");
    expect(element).toBeDefined();
  });
});
