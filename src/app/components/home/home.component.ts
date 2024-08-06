import {Component, OnInit} from '@angular/core';
import {CategoryModel} from "../models/category.model";
import {DataService} from "../../services/data.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  data: CategoryModel[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (response: CategoryModel[]) => {
        this.data = response;
      },
      (error) => {
        console.error('Erro ao buscar dados:', error);
      }
    );
  }
}
