package com.floperfume.FloPerfume.Repositories;

import com.floperfume.FloPerfume.Classes.Perfume;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PerfumeRepository extends MongoRepository<Perfume, ObjectId> {
    Perfume findPerfumeById(String id);
    List<Perfume> findByTopNotesInAndMiddleNotesInAndBaseNotesIn(
            List<String> topNotes,
            List<String> middleNotes,
            List<String> baseNotes
    );
}
