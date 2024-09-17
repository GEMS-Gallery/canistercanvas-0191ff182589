export const idlFactory = ({ IDL }) => {
  const Drawing = IDL.Record({ 'imageData' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  return IDL.Service({
    'getDrawings' : IDL.Func([], [IDL.Vec(Drawing)], []),
    'saveDrawing' : IDL.Func([IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
