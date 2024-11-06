package com.odysseus.model.payload.packingList;

import java.util.List;

public class PackingListUpdatePayload {
    private Long packingListId;
    private String label;
    private List<String> items;

    public PackingListUpdatePayload() {

    }

    public PackingListUpdatePayload(Long packingListId, String label, List<String> items) {
        super();
        this.packingListId = packingListId;
        this.label = label;
        this.items = items;
    }

    public PackingListUpdatePayload(Long packingListId, List<String> items) {
        super();
        this.packingListId = packingListId;
        this.items = items;
    }

    public PackingListUpdatePayload(Long packingListId, String label) {
        super();
        this.packingListId = packingListId;
        this.label = label;
    }


    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Long getPackingListId() {
        return packingListId;
    }

    public void setPackingListId(Long packingListId) {
        this.packingListId = packingListId;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }
}