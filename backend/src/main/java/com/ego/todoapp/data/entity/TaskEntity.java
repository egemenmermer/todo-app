package com.ego.todoapp.data.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.annotation.Around;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Log4j2
@Builder
@Entity
public class TaskEntity  implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    @Column(name = "task-title")
    private String taskTitle;

    @Column(name = "task-description")
    private String taskDescription;

    @Column(name = "task-priority")
    private int taskPriority;

    @Column(name = "task-status")
    private String taskStatus;

}