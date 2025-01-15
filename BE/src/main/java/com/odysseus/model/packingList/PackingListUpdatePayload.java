package com.odysseus.model.packingList;

import java.util.List;

public class PackingListUpdatePayload {
    private Long id;
    private String label;
    private List<String> items;

    public PackingListUpdatePayload() {

    }

    public PackingListUpdatePayload(Long id, String label, List<String> items) {
        super();
        this.id = id;
        this.label = label;
        this.items = items;
    }

    public PackingListUpdatePayload(Long id, List<String> items) {
        super();
        this.id = id;
        this.items = items;
    }

    public PackingListUpdatePayload(Long id, String label) {
        super();
        this.id = id;
        this.label = label;
    }


    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }
}