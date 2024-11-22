export interface Form {
  militaryType: string;
  form: FormDetail[];
}

interface FormDetail {
  name: string;
  type: string;
  group?: FormGroup[];
  score: Record<string, number>;
}

interface FormGroup {
  name: string;
  priority: number;
  limit: number;
}
