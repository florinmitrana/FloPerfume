package com.floperfume.FloPerfume.Repositories;

import com.floperfume.FloPerfume.Classes.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    User findUserById(String id);
    User findUserByName(String name);
    User findUserByEmail(String email);
}
