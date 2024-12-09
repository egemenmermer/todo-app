package com.ego.todoapp.business.service;


import com.ego.todoapp.business.dto.TaskDto;
import com.ego.todoapp.data.entity.TaskEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TaskService {


    public List<TaskDto> getAllTasks();
    public TaskDto createTask(TaskDto taskDto);
    public ResponseEntity<TaskDto> updateTask(Long id, TaskDto taskDto);
    public ResponseEntity<TaskDto> getTaskById(Long id);
    public ResponseEntity<TaskDto> deleteTaskById(Long id);

    public TaskDto EntitytoDto(TaskEntity taskEntity);
    public TaskEntity DtotoEntity (TaskDto taskDto);
}
