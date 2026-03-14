import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { BaseSpinner } from "../src/index";

describe("BaseSpinner", () => {
  it("renders with default props", () => {
    const wrapper = mount(BaseSpinner);
    expect(wrapper.find(".base-spinner").exists()).toBe(true);
    expect(wrapper.classes()).toContain("base-spinner--md");
    expect(wrapper.classes()).toContain("base-spinner--current");
  });

  it("renders with custom size and color", () => {
    const wrapper = mount(BaseSpinner, {
      props: { size: "lg", color: "accent" },
    });
    expect(wrapper.classes()).toContain("base-spinner--lg");
    expect(wrapper.classes()).toContain("base-spinner--accent");
  });

  it("has role=status for accessibility", () => {
    const wrapper = mount(BaseSpinner);
    expect(wrapper.attributes("role")).toBe("status");
  });

  it("sets aria-label when provided", () => {
    const wrapper = mount(BaseSpinner, {
      props: { label: "Loading..." },
    });
    expect(wrapper.attributes("aria-label")).toBe("Loading...");
  });
});
