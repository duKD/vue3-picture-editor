import { Editor, getEditorCanvas } from ".";
import { fabric } from "fabric";
import edgeImg from "@/assets/editor/edgecontrol.svg?url";
import verticalImg from "@/assets/editor/middlecontrol.svg?url";
import horizontalImg from "@/assets/editor/middlecontrolhoz.svg?url";
import rotateImg from "@/assets/editor/rotateicon.svg?url";

//对象属性计算和存储时的小数位数为 4
fabric.Object.NUM_FRACTION_DIGITS = 4;

export default function initControl(_opt?: any) {
  const canvas = getEditorCanvas();
  deleteControl(canvas);
  // 顶点图标
  peakControl();
  // 中间横杠图标
  intervalControl();
  // 旋转图标
  rotationControl();
  // 选中样式
  fabric.Object.prototype.set({
    transparentCorners: false,
    borderColor: "#2575fa",
    cornerColor: "#FFF",
    borderScaleFactor: 2.5,
    cornerStyle: "circle",
    cornerStrokeColor: "#0E98FC",
    borderOpacityWhenMoving: 1,
  });
  // textbox保持一致
  fabric.Textbox.prototype.controls = fabric.Object.prototype.controls;
}

/**
 * 绘制图像到画布
 * @param ctx 画布的2D上下文
 * @param left 图像左上角相对于画布的X坐标
 * @param top 图像左上角相对于画布的Y坐标
 * @param img 要绘制的HTML图像元素
 * @param wSize 图像显示的宽度
 * @param hSize 图像显示的高度
 * @param angle 图像的旋转角度（单位：度），如果未定义，则不进行旋转
 */
function drawImg(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  img: HTMLImageElement,
  wSize: number,
  hSize: number,
  angle: number | undefined
) {
  // 如果没有指定旋转角度，则直接返回，不执行后续绘制操作
  // if (angle === undefined) return;

  // 保存当前画布状态
  ctx.save();
  // 将画布的参考点移动到图像的中心点
  ctx.translate(left, top);
  // 根据指定的角度旋转画布
  ctx.rotate(fabric.util.degreesToRadians(angle || 0));
  // 绘制图像，图像中心点位于参考点，即画布的中心点
  ctx.drawImage(img, -wSize / 2, -hSize / 2, wSize, hSize);
  // 恢复之前保存的画布状态
  ctx.restore();
}
// 删除图标
function deleteControl(canvas: fabric.Canvas) {
  const deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
  const delImg = document.createElement("img");
  delImg.src = deleteIcon;

  function renderDelIcon(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    _styleOverride: any,
    fabricObject: fabric.Object
  ) {
    drawImg(ctx, left, top, delImg, 24, 24, fabricObject.angle);
  }

  // 删除选中元素
  function deleteObject(_mouseEvent: MouseEvent, target: fabric.Transform) {
    if (target.action === "rotate") return true;
    const activeObject = canvas.getActiveObjects();
    if (activeObject) {
      activeObject.map((item) => canvas.remove(item));
      canvas.requestRenderAll();
      canvas.discardActiveObject();
    }
    return true;
  }

  // 删除图标
  // 针对 Textbox 做特殊处理

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    // offsetX: 16,
    cursorStyle: "pointer",
    mouseUpHandler: deleteObject,
    render: renderDelIcon,
    //@ts-ignore
    cornerSize: 24,
  });
}

// 顶点
function peakControl() {
  const img = document.createElement("img");

  img.src = edgeImg;

  function renderIconEdge(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    _styleOverride: any,
    fabricObject: fabric.Object
  ) {
    drawImg(ctx, left, top, img, 25, 25, fabricObject.angle);
  }
  // 四角图标

  const temp = {
    tl: new fabric.Control({
      x: -0.5,
      y: -0.5,
      cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
      actionHandler: fabric.controlsUtils.scalingEqually,
      render: renderIconEdge,
    }),
    bl: new fabric.Control({
      x: -0.5,
      y: 0.5,
      cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
      actionHandler: fabric.controlsUtils.scalingEqually,
      render: renderIconEdge,
    }),
    tr: new fabric.Control({
      x: 0.5,
      y: -0.5,
      cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
      actionHandler: fabric.controlsUtils.scalingEqually,
      render: renderIconEdge,
    }),
    br: new fabric.Control({
      x: 0.5,
      y: 0.5,
      cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
      actionHandler: fabric.controlsUtils.scalingEqually,
      render: renderIconEdge,
    }),
  };

  fabric.Object.prototype.controls = Object.assign(
    fabric.Object.prototype.controls,
    temp
  );
  fabric.Textbox.prototype.controls = Object.assign(
    fabric.Textbox.prototype.controls,
    temp
  );
}

// 中间横杠
function intervalControl() {
  const verticalImgIcon = document.createElement("img");
  verticalImgIcon.src = verticalImg;

  const horizontalImgIcon = document.createElement("img");
  horizontalImgIcon.src = horizontalImg;

  function renderIcon(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    _styleOverride: any,
    fabricObject: fabric.Object
  ) {
    drawImg(ctx, left, top, verticalImgIcon, 20, 25, fabricObject.angle);
  }

  function renderIconHoz(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    _styleOverride: any,
    fabricObject: fabric.Object
  ) {
    drawImg(ctx, left, top, horizontalImgIcon, 25, 20, fabricObject.angle);
  }
  // 中间横杠
  fabric.Object.prototype.controls.ml = new fabric.Control({
    x: -0.5,
    y: 0,
    offsetX: -1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIcon,
  });

  fabric.Object.prototype.controls.mr = new fabric.Control({
    x: 0.5,
    y: 0,
    offsetX: 1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIcon,
  });

  fabric.Object.prototype.controls.mb = new fabric.Control({
    x: 0,
    y: 0.5,
    offsetY: 1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIconHoz,
  });

  fabric.Object.prototype.controls.mt = new fabric.Control({
    x: 0,
    y: -0.5,
    offsetY: -1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIconHoz,
  });
}

// 旋转
function rotationControl() {
  const img = document.createElement("img");
  img.src = rotateImg;
  function renderIconRotate(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    _styleOverride: any,
    fabricObject: fabric.Object
  ) {
    drawImg(ctx, left, top, img, 40, 40, fabricObject.angle);
  }
  // 旋转图标
  fabric.Object.prototype.controls.mtr = new fabric.Control({
    x: 0,
    y: 0.5,
    cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    offsetY: 30,
    // withConnecton: false,
    actionName: "rotate",
    render: renderIconRotate,
  });
}
