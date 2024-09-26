package com.floperfume.FloPerfume.Controllers;

import com.floperfume.FloPerfume.Classes.Perfume;
import com.floperfume.FloPerfume.Services.PerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/perfumes")
@CrossOrigin(origins = "*")
public class PerfumeController {
@Autowired
    private PerfumeService service;
    @GetMapping
    public ResponseEntity<List<Perfume>> getPerfumes(){

    return new ResponseEntity<List<Perfume>>(service.findAllPerfumes(),HttpStatus.OK);

    }
    @GetMapping("/{id}")
    public ResponseEntity<Perfume> getSinglePerfume( @PathVariable String id){
        return new ResponseEntity<Perfume>(service.findPerfumeById(id),HttpStatus.OK);

    }
    @GetMapping("/{id}/recommandations")
    public ResponseEntity<List<Perfume>> getRecommendedPerfumes( @PathVariable String id){
        return new ResponseEntity<List<Perfume>>(service.recommendPerfume(id),HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<Perfume> addPerfume(@RequestBody Perfume perfume) {
        try {
            Perfume newPerfume = service.addPerfume(perfume);
            return new ResponseEntity<>(newPerfume, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
