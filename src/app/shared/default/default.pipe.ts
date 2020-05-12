import {
  Inject,
  InjectionToken,
  Optional,
  Pipe,
  PipeTransform,
} from '@angular/core';

export type DefaultPipeType = 'strict' | 'loose';
export const DEFAULT_PIPE_TYPE = new InjectionToken<DefaultPipeType>(
  'DEFAULT_PIPE_TYPE'
);

@Pipe({ name: 'default' })
export class DefaultPipe implements PipeTransform {
  constructor(
    @Optional()
    @Inject(DEFAULT_PIPE_TYPE)
    private defaultPipeType: DefaultPipeType
  ) {}

  transform<T = any, R = any>(
    value: T,
    defaultValue: R,
    type?: DefaultPipeType
  ): T | R {
    type = type ?? this.defaultPipeType ?? 'strict';
    switch (type) {
      case 'strict':
        return value ?? defaultValue;
      case 'loose':
        return !!value ? value : value;
    }
  }
}
