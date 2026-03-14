import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { BaseButton } from "../src/index";

describe("BaseButton", () => {
  it("renders with default props", () => {
    const wrapper = mount(BaseButton, {
      slots: { default: "Click me" },
    });
    expect(wrapper.text()).toContain("Click me");
    expect(wrapper.classes()).toContain("base-button--primary");
    expect(wrapper.classes()).toContain("base-button--md");
  });

  it("emits click event", async () => {
    const wrapper = mount(BaseButton);
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("is disabled when disabled prop is true", () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
    });
    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("is disabled when loading", () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
    });
    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.classes()).toContain("base-button--loading");
  });

  it("renders correct button type", () => {
    const wrapper = mount(BaseButton, {
      props: { type: "submit" },
    });
    expect(wrapper.attributes("type")).toBe("submit");
  });
});
