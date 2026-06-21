package com.portfolio.ChatAssistant.dto;

import com.portfolio.ChatAssistant.enums.DisplayIntent;
import com.portfolio.ChatAssistant.enums.DisplayType;

/**
 * Reusable factory for creating DisplayPayloads.
 * Eliminates duplicated payload creation logic
 * across all domains.
 */
public final class DisplayPayloadFactory {

    private DisplayPayloadFactory() {}

    public static DisplayPayload showItem(
            DisplayType displayType,
            Object payload
    ) {
        return DisplayPayload.builder()
                .intent(DisplayIntent.SHOW_ITEM)
                .displayType(displayType)
                .payload(payload)
                .build();
    }

    public static DisplayPayload showCollection(
            DisplayType displayType,
            Object listPayload
    ) {
        return DisplayPayload.builder()
                .intent(DisplayIntent.SHOW_COLLECTION)
                .displayType(displayType)
                .payload(listPayload)
                .build();
    }
}
