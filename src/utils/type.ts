// Standart diğer değerler için bileşenler tiplerini oluşturur.
export type ValuesOf<T> = T[keyof T];

// Bileşenleri varsayılan değerleri olan React bileşenleri için doğru tip özellikleri oluşturur.
export type WithDefaultProps<Props, DefaultProps> = Partial<DefaultProps> &
  Omit<Props, keyof DefaultProps>;

// React fonksiyonel bileşenler ve tip düzeltme için geçici düzeltmeyi içerir; https://github.com/microsoft/TypeScript/issues/27425#issuecomment-473848082
export type FixDefaults<
  T extends React.FC<any>,
  D extends Partial<React.ComponentProps<T>>
> = Pick<T, Exclude<keyof T, 'defaultProps'>> &
  (T extends (...a: infer A) => infer R ? (...a: A) => R : never) & {
    defaultProps: D;
  };
