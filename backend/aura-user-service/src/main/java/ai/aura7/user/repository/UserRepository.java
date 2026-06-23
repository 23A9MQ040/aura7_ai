package ai.aura7.user.repository;

import ai.aura7.user.entity.AuraUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<AuraUser, Long> {
    AuraUser findByUsername(String username);
    AuraUser findByEmail(String email);
}
