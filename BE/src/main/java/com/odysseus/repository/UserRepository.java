package com.odysseus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.odysseus.model.user.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM users WHERE email = ?1 AND google_user = ?2", nativeQuery = true)
    public User findByEmail(String email, boolean isGoogleUser);
}