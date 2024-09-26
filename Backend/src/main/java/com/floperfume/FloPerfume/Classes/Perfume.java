package com.floperfume.FloPerfume.Classes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "perfumes")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Perfume {
    @Id
    private String id;
    private String name;
    private List<String> topNotes;
    private List<String> middleNotes;
    private List<String> baseNotes;
    private List<String> longevity;
    private List<String> gender;
    private List<String> images;
    private List<Supplier> suppliers;


}
