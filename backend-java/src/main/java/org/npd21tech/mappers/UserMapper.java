package org.npd21tech.mappers;

import java.util.UUID;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.npd21tech.dtos.UserResponse;
import org.npd21tech.entities.UsersEntity;
import org.npd21tech.models.RegisterModel;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, imports = { UUID.class })
public interface UserMapper {

    @Mapping(target = "id", expression = "java(UUID.randomUUID())")
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "phoneNumber", ignore = true)
    @Mapping(target = "apiTokens", ignore = true)
    @Mapping(target = "google_email", ignore = true)
    UsersEntity fromDto(RegisterModel registerModel);

    UserResponse fromEntity(UsersEntity usersEntity);
}
