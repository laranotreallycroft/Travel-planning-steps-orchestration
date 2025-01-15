package com.odysseus.model.packingList;

import java.util.List;

public class PackingListCheckedPayload {
    private Long id;
    private String label;
    private List<String> checkedItems;

    public PackingListCheckedPayload() {

    }

    public PackingListCheckedPayload(Long id, String label, List<String> checkedItems) {
        super();
        this.id = id;
        this.label = label;
        this.checkedItems = checkedItems;
    }

    public PackingListCheckedPayload(Long id, List<String> checkedItems) {
        super();
        this.id = id;
        this.checkedItems = checkedItems;
    }

    public PackingListCheckedPayload(Long id, String label) {
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

    public List<String> getCheckedItems() {
        return checkedItems;
    }

    public void setCheckedItems(List<String> checkedItems) {
        this.checkedItems = checkedItems;
    }
}