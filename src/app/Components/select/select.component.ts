import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectOption } from '../../Interfaces/selectOption';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() placeholder = '';
  @Input() options: SelectOption[] = [];
  @Input() selectedOption: SelectOption | undefined;
  @Output() selectedOptionChange: EventEmitter<SelectOption | undefined> =
    new EventEmitter<SelectOption | undefined>();

  public dropdownVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  public toggleOption(option: SelectOption): void {
    if (this.selectedOption?.id === option.id) {
      this.selectedOption = undefined;
    } else {
      this.selectedOption = option;
    }
    this.selectedOptionChange.next(this.selectedOption);
    this.dropdownVisible = false;
  }
}
