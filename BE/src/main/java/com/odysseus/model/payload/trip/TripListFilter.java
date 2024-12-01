package com.odysseus.model.payload.trip;

public class TripListFilter {
    boolean upcomingOnly = false;
    boolean pastOnly = false;

    public TripListFilter() {
 
    }

    public TripListFilter(boolean upcomingOnly, boolean pastOnly) {
        this.upcomingOnly = upcomingOnly;
        this.pastOnly = pastOnly;
    }

    public boolean isUpcomingOnly() {
        return upcomingOnly;
    }

    public void setUpcomingOnly(boolean upcomingOnly) {
        this.upcomingOnly = upcomingOnly;
    }

    public boolean isPastOnly() {
        return pastOnly;
    }

    public void setPastOnly(boolean pastOnly) {
        this.pastOnly = pastOnly;
    }
}
