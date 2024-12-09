package com.ego.todoapp.controller;

import com.ego.todoapp.business.dto.TaskDto;
import com.ego.todoapp.business.service.TaskService;
import com.ego.todoapp.data.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(("/api/v1/tasks"))
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto) {
        TaskDto tasks = taskService.createTask(taskDto);
        System.out.println("Title: " + taskDto.getTitle());
        System.out.println("Description: " + taskDto.getDescription());
        return new ResponseEntity<>(tasks, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Long id) {
        TaskDto taskDto = taskService.getTaskById(id).getBody();
        return new ResponseEntity<>(taskDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getAllTasks() {
        List<TaskDto> taskDtos = taskService.getAllTasks();
        return new ResponseEntity<>(taskDtos, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long id, @RequestBody TaskDto taskDto) {
        TaskDto updatedTask = taskService.getTaskById(id).getBody();
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable(required = false) Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Task ID is required");
        }
        taskService.deleteTaskById(id);
        return ResponseEntity.noContent().build();
    }
}
