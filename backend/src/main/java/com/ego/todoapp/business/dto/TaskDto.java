package com.ego.todoapp.business.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Log4j2
public class TaskDto {

    private Long id;
    private String title;
    private String description;
    private int priority;
    private String status;
}
