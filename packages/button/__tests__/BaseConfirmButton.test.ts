import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { BaseConfirmButton } from "../src/index";

describe("BaseConfirmButton", () => {
  it("renders with label", () => {
    const wrapper = mount(BaseConfirmButton, {
      props: { label: "Confirm" },
    });
    expect(wrapper.text()).toContain("Confirm");
  });

  it("emits confirmed on click when holdToConfirm is false", async () => {
    const wrapper = mount(BaseConfirmButton, {
      props: { label: "OK", holdToConfirm: false },
    });
    await wrapper.trigger("click");
    expect(wrapper.emitted("confirmed")).toHaveLength(1);
  });

  it("does not emit on click when disabled", async () => {
    const wrapper = mount(BaseConfirmButton, {
      props: { label: "OK", disabled: true },
    });
    await wrapper.trigger("click");
    expect(wrapper.emitted("confirmed")).toBeUndefined();
  });

  it("shows check icon when selected", () => {
    const wrapper = mount(BaseConfirmButton, {
      props: { label: "Done", selected: true },
    });
    expect(wrapper.find("svg").exists()).toBe(true);
    expect(wrapper.classes()).toContain("base-confirm-button--selected");
  });
});
