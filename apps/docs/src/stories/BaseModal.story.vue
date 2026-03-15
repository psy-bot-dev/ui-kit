<script setup lang="ts">
import { ref } from "vue";
import { BaseModal } from "@psy-bot-dev/ui";

const showDefault = ref(false);
const showWithFooter = ref(false);
const showNonClosable = ref(false);
const showNoBackdropClose = ref(false);
</script>

<template>
  <Story title="UI/BaseModal" :layout="{ type: 'single', iframe: true }">
    <Variant title="Default">
      <div style="padding: 24px">
        <button
          style="
            padding: 8px 16px;
            border-radius: 8px;
            background: #4f46e5;
            color: white;
            cursor: pointer;
          "
          @click="showDefault = true"
        >
          Open Modal
        </button>
        <base-modal v-model="showDefault" title="Default Modal">
          <p>
            This is the modal body content. It supports any HTML or Vue
            components.
          </p>
        </base-modal>
      </div>
    </Variant>

    <Variant title="With Footer">
      <div style="padding: 24px">
        <button
          style="
            padding: 8px 16px;
            border-radius: 8px;
            background: #4f46e5;
            color: white;
            cursor: pointer;
          "
          @click="showWithFooter = true"
        >
          Open Modal with Footer
        </button>
        <base-modal v-model="showWithFooter" title="Confirm Action">
          <p>Are you sure you want to proceed with this action?</p>
          <template #footer>
            <button
              style="
                padding: 8px 16px;
                border-radius: 8px;
                border: 1px solid #ddd;
                cursor: pointer;
              "
              @click="showWithFooter = false"
            >
              Cancel
            </button>
            <button
              style="
                padding: 8px 16px;
                border-radius: 8px;
                background: #4f46e5;
                color: white;
                cursor: pointer;
              "
              @click="showWithFooter = false"
            >
              Confirm
            </button>
          </template>
        </base-modal>
      </div>
    </Variant>

    <Variant title="Non-closable">
      <div style="padding: 24px">
        <button
          style="
            padding: 8px 16px;
            border-radius: 8px;
            background: #4f46e5;
            color: white;
            cursor: pointer;
          "
          @click="showNonClosable = true"
        >
          Open Non-closable Modal
        </button>
        <base-modal
          v-model="showNonClosable"
          title="Non-closable Modal"
          :closable="false"
          :close-on-backdrop="false"
        >
          <p>
            This modal has no close button and cannot be dismissed by clicking
            the backdrop.
          </p>
          <template #footer>
            <button
              style="
                padding: 8px 16px;
                border-radius: 8px;
                background: #4f46e5;
                color: white;
                cursor: pointer;
              "
              @click="showNonClosable = false"
            >
              Acknowledge
            </button>
          </template>
        </base-modal>
      </div>
    </Variant>

    <Variant title="No Backdrop Close">
      <div style="padding: 24px">
        <button
          style="
            padding: 8px 16px;
            border-radius: 8px;
            background: #4f46e5;
            color: white;
            cursor: pointer;
          "
          @click="showNoBackdropClose = true"
        >
          Open (backdrop click disabled)
        </button>
        <base-modal
          v-model="showNoBackdropClose"
          title="Persistent Modal"
          :close-on-backdrop="false"
        >
          <p>
            Clicking the backdrop will not close this modal. Use the X button or
            press Escape.
          </p>
        </base-modal>
      </div>
    </Variant>
  </Story>
</template>
