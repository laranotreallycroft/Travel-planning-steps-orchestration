package com.odysseus.utils;

import java.util.List;
import java.util.stream.Collectors;

public class General {
    public static List<String> getIntersection(List<String> list1, List<String> list2) {
        return list1.stream().filter(list2::contains).collect(Collectors.toList());
    }
}
