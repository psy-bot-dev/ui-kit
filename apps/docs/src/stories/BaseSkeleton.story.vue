<script setup lang="ts">
import { BaseSkeleton } from "@psy-bot-dev/ui";
</script>

<template>
  <Story title="UI/BaseSkeleton" :layout="{ type: 'single', iframe: true }">
    <Variant title="Text (default)">
      <div
        style="
          max-width: 400px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        "
      >
        <base-skeleton />
        <base-skeleton width="80%" />
        <base-skeleton width="60%" />
      </div>
    </Variant>

    <Variant title="Circle">
      <div style="padding: 24px; display: flex; gap: 16px; align-items: center">
        <base-skeleton variant="circle" width="32px" height="32px" />
        <base-skeleton variant="circle" width="48px" height="48px" />
        <base-skeleton variant="circle" width="64px" height="64px" />
      </div>
    </Variant>

    <Variant title="Rect">
      <div style="padding: 24px; display: flex; gap: 16px">
        <base-skeleton variant="rect" width="120px" height="80px" />
        <base-skeleton variant="rect" width="200px" height="120px" />
      </div>
    </Variant>

    <Variant title="Card Layout">
      <div
        style="
          max-width: 360px;
          padding: 24px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        "
      >
        <base-skeleton variant="circle" width="48px" height="48px" />
        <div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
          <base-skeleton width="140px" />
          <base-skeleton />
          <base-skeleton width="75%" />
        </div>
      </div>
    </Variant>
  </Story>
</template>
