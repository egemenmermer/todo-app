package com.ego.todoapp.business.service.Impl;

import com.ego.todoapp.business.dto.TaskDto;
import com.ego.todoapp.business.service.TaskService;
import com.ego.todoapp.data.entity.TaskEntity;
import com.ego.todoapp.data.repository.TaskRepository;
import com.ego.todoapp.exception.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<TaskDto> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(task -> modelMapper.map(task, TaskDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        TaskEntity taskEntity = DtotoEntity(taskDto);
        taskEntity.setStatus("Pending");
        taskRepository.save(taskEntity);
        return taskDto;
    }

    @Override
    public ResponseEntity<TaskDto> updateTask(Long id, TaskDto taskDto) {
        // Find the existing task by ID
        TaskEntity existingTaskEntity = taskRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Task with the id " + id + " not found"));

        // Update fields
        existingTaskEntity.setTitle(taskDto.getTitle());
        existingTaskEntity.setDescription(taskDto.getDescription());
        existingTaskEntity.setPriority(String.valueOf(taskDto.getPriority()));
        existingTaskEntity.setStatus(taskDto.getStatus());

        // Save updated entity to the database
        TaskEntity updatedTaskEntity = taskRepository.save(existingTaskEntity);

        // Convert the updated entity back to DTO
        TaskDto updatedTaskDto = EntitytoDto(updatedTaskEntity);
        return ResponseEntity.ok(updatedTaskDto);
    }

    @Override
    public ResponseEntity<TaskDto> getTaskById(Long id) {
        TaskEntity task =
                taskRepository.findById(id).orElseThrow(
                        () -> new ResourceNotFoundException("Task with the " + id + "id not found"));

        TaskDto taskDto = EntitytoDto(task);
        return ResponseEntity.ok(taskDto);
    }

    @Override
    public ResponseEntity<TaskDto> deleteTaskById(Long id) {
        TaskEntity task = taskRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Task with the " + id + "id not found"));

        taskRepository.delete(task);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(EntitytoDto(task));
    }

    @Override
    public TaskDto EntitytoDto(TaskEntity taskEntity) {
        TaskDto taskDto = modelMapper.map(taskEntity, TaskDto.class);
        return taskDto;
    }

    @Override
    public TaskEntity DtotoEntity(TaskDto taskDto) {
        TaskEntity taskEntity = modelMapper.map(taskDto, TaskEntity.class);
        return taskEntity;
    }
}
