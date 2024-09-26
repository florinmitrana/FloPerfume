package com.floperfume.FloPerfume.Services;

import com.floperfume.FloPerfume.Classes.Perfume;
import com.floperfume.FloPerfume.Classes.Supplier;
import com.floperfume.FloPerfume.Repositories.PerfumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PerfumeService {
    @Autowired
    private PerfumeRepository repository;
    public List<Perfume> findAllPerfumes(){
        return repository.findAll();
    }
    public Perfume findPerfumeById(String id){
        return repository.findPerfumeById(id);
    }

    private long countMatchingNotes(List<String> notes1, List<String> notes2){
        return notes1.stream().filter(notes2::contains).count();
    }
    public List<Perfume> recommendPerfume(String id){
         Perfume perfume = findPerfumeById(id);


        Optional<Double> currentMinPrice = perfume.getSuppliers().stream()
                .map(Supplier::getPrice)
                .min(Double::compareTo);
        if (currentMinPrice.isEmpty()) {
            throw new RuntimeException("No suppliers found for the current perfume.");
        }
         double minPrice = currentMinPrice.get();

        List<Perfume> potentialMatches = repository.findByTopNotesInAndMiddleNotesInAndBaseNotesIn(
                perfume.getTopNotes(),
                perfume.getMiddleNotes(),
                perfume.getBaseNotes()
        );
        return potentialMatches.stream().filter(p ->
                countMatchingNotes(perfume.getTopNotes(), p.getTopNotes()) >= 1 &&
                        countMatchingNotes(perfume.getMiddleNotes(), p.getMiddleNotes()) >= 1 &&
                        countMatchingNotes(perfume.getBaseNotes(), p.getBaseNotes()) >= 1 &&
                        p.getSuppliers().stream().anyMatch(supplier -> supplier.getPrice() < minPrice)


        ).collect(Collectors.toList());
    }
    public Perfume addPerfume(Perfume perfume) {
        return repository.save(perfume);
    }
}