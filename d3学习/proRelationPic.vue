<template>
  <div id="relation-box">
    <div id="product_tree"></div>
  </div>
</template>
<script>
import '../util/d3.min.js'
export default {
  props:{
    PnodeList: {
      type: Array,
      required: true,
      default:()=>[]
    },
    widthRatio: {
      type: Number,
      required: false,
      default:2
    },
  },
  data() {
    return {
      rootData:{
          "downward": {
              "direction": "downward",
              "agentUserName": "origin",
              "children": this.PnodeList
          }
      },
      rootagentUserName:"开始",
      rootRectWidth:0,
      treeData:{}
    };
  },
  watch:{
    PnodeList(newVal){
      this.getData(newVal)
    },
  },
  mounted() {
    
  },
  methods: {
    nodeclick(item) {
      this.$emit("nodeclick",item)
    },
    clickLine(item) {
      this.$emit("clickLine",item)
    },
    deleteItem(item) {
      this.$emit("deleteItem",item)
    },
    getData(list) {
        // 测试内容
        this.rootData = {
            "downward": {
                "direction": "downward",
                "agentUserName": "origin",
                "children": list
            }
        }
        this.drawChart();
    },
    getTreeConfig() {
        var treeConfig = {
            'margin': {
                'top': -500,
                'right': 5,
                'bottom': 0,
                'left': this.widthRatio == 2 ? 5 : 300
            }
        }
        var cw = this.widthRatio == 2 ? 1600 : 900

        treeConfig.chartWidth = (cw - treeConfig.margin.right - treeConfig.margin.left);
        treeConfig.chartHeight = (800 - treeConfig.margin.top - treeConfig.margin.bottom);
        treeConfig.centralHeight = treeConfig.chartHeight / 2;
        treeConfig.centralWidth = treeConfig.chartWidth / this.widthRatio;
        treeConfig.linkLength = 200;
        treeConfig.duration = 500; //动画时间
        return treeConfig;
    },
    graphTree(config) {
        var self = this;
        var linkLength = config.linkLength;
        var duration = config.duration;
        var hasChildNodeArr = [];
        var id = 0;
        
        var funLine = function(obj) {  //折线函数
            var s = obj.source;
            var sy = (s.agentUserName == 'origin' ? s.y :s.y+50);
            var t = obj.target;
            
            return "M"+s.x+","+sy+"L"+s.x+","+(sy+(t.y-sy)/2)+"L"+t.x+","+(sy+(t.y-sy)/2)+"L"+t.x+","+t.y;
        };

        var zoom = d3.behavior.zoom()
            .scaleExtent([0.5, 2])
            .on('zoom', redraw);
        var svg = d3.select('#product_tree')
            .append('svg')
            .attr('width', config.chartWidth + config.margin.right + config.margin.left)
            .attr('height', config.chartHeight + config.margin.top + config.margin.bottom)
            .attr('xmlns','http://www.w3.org/2000/svg')
            .on('mousedown', disableRightClick)
            .call(zoom)
            .on('dblclick.zoom', null);
        var treeG = svg.append('g')
            .attr('class', 'gbox')
            .attr('transform', 'translate(' + config.margin.left + ',' + config.margin.top + ')').append('g');


        // Initialize the tree nodes and update chart.

        var data = self.treeData['downward'];
            if (typeof(data) != "undefined") {
                data.x0 = config.centralWidth;
                data.y0 = config.centralHeight;
                if(data.children){
                  data.children.forEach(collapse);
                  data.children.forEach(expand);
                }
                update(data, data, treeG);
            }
        function update(source, originalData, g) {
            var direction = originalData['direction'];

            var node_class = direction + 'Node';
            var link_class = direction + 'Link';
            var downwardSign = 1;
            var nodeColor = '#3894FF';


            var nodeSpace = 160;
            var tree = d3.layout.tree().sort(sortByDate).nodeSize([nodeSpace, 0]);
            var nodes = tree.nodes(originalData);
            
            var links = tree.links(nodes);
            
            var offsetX = -config.centralWidth;
            nodes.forEach(function(d) {
                d.y = downwardSign * (d.depth * linkLength) + config.centralHeight;
                d.x = d.x - offsetX;
                if(d.agentUserName == 'origin') {
                    d.x = config.centralWidth;
                    d.y += downwardSign * 0; // 上下两树图根节点之间的距离
                }
            });

            // Update the node.
            var node = g.selectAll('g.' + node_class)
                .data(nodes, function(d) {
                    return d.id || (d.id = ++id);
                });
            //节点
            var nodeEnter = node.enter().append('g')

                .attr('class', node_class)
                //			.classed('alink',true)//为选择名称而添加的统一class
                .attr('data-text', function(d) {
                    return d.agentUserName;
                })
                .attr('transform', function(d) {
                    return 'translate(' + source.x0 + ',' + source.y0 + ')';
                })

                .style('cursor', function(d) {
                    return(d.agentUserName == 'origin') ? '' : (d.children || d._children) ? 'pointer' : '';
                });
                
            //节点边框
            nodeEnter.append("svg:rect")
                .attr("x", function(d) {
                    return(d.agentUserName == 'origin') ? -75 : -80;
                })
                .attr("y", function(d) {
                    return(d.agentUserName == 'origin') ? -20 : 0;
                })
                .attr("width", function(d) {
                    return(d.agentUserName == 'origin') ? 150 : 150;
                })
                .attr("height", 40)
                .attr("rx", 10)
                .style("stroke", nodeColor)//节点边框色
                .style("fill", function(d) {
                    return(d.agentUserName == 'origin') ? nodeColor :  "#FFF";//节点背景色
                });

            
            //名称第一行
            nodeEnter.append("text")
                .attr("class", "linkagentUserName")
                .attr("x", "0")
                .attr('dy', function(d) {
                    return(d.agentUserName == 'origin') ? '.35em' : d.agentUserName.length>10? '18': '26';
                })
                .attr("text-anchor",'middle')
                .attr('fill', function(d) {
                    return(d.agentUserName == 'origin') ? '#fff' : '#101010';
                })
                .text(function(d) {
                    if(d.agentUserName == 'origin') {
                        return self.rootagentUserName;
                    }
                    return(d.agentUserName.length > 10) ? d.agentUserName.substr(0, 10) : d.agentUserName;
                })
                .style({
                    'fill-opacity': 1e-6,
                    'font-size': function(d) {
                        return(d.agentUserName == 'origin') ? 14 : 13;
                    },
                    'cursor': "pointer"
                })
                .on('click', self.nodeclick);
            //名称第二行
            nodeEnter.append("text")
                .attr("class", "linkagentUserName")
                .attr("x","0")
                .attr("dy", function(d) {
                    return(d.agentUserName == 'origin') ? '0' :'33';
                })
                .attr("text-anchor",'middle')
                .text(function(d) {
                    return d.agentUserName.substr(10, d.agentUserName.length);
                })
                .style({
                    'fill': '#101010',
                    'font-size': function(d) {
                        return(d.agentUserName == 'origin') ? 14 : 13;
                    },
                    'cursor': "pointer"
                })
                .on('click', self.nodeclick);
            //加减号边框
            nodeEnter.append('svg:rect')
                .attr("x", function(d) {
                    return(d.agentUserName == 'origin') ? -5 : -5;
                })
                .attr("y", function(d) {
                    return(d.agentUserName == 'origin') ? 20 : 40;
                })
                .attr("width", function(d) {
                    return (d.agentUserName == 'origin') || hasChildNodeArr.indexOf(d) != -1 ? 10 : 0;//加减号宽度
                })
                .attr("height", function(d) {
                    return (d.agentUserName == 'origin') || hasChildNodeArr.indexOf(d) != -1 ? 10 : 0;//加减号高度
                })
                .style("stroke", "#000")
                .style("fill", "#FFF");
            //删除图标
            nodeEnter.append('svg')
                .attr("width", 13)
                .attr("height", 13)
                .attr('xmlns','http://www.w3.org/2000/svg')
                .attr('viewBox','0 0 1024 1024')
                .attr("x", function(d) {
                    return hasChildNodeArr.indexOf(d) == -1 ? 50 : 0;
                })
                .attr("y", function(d) {
                    return hasChildNodeArr.indexOf(d) == -1 ? 20 : 0;
                })
                .append('path')
                .attr("d", function(d) {
                    return (self.widthRatio == 2 && hasChildNodeArr.indexOf(d) == -1&&d.agentUserName!="origin") ? 'M799.2 874.4c0 34.4-28.001 62.4-62.4 62.4H287.2c-34.4 0-62.4-28-62.4-62.4V212h574.4v662.4zM349.6 100c0-7.2 5.6-12.8 12.8-12.8h300c7.2 0 12.8 5.6 12.8 12.8v37.6H349.6V100z m636.8 37.6H749.6V100c0-48.001-39.2-87.2-87.2-87.2h-300c-48 0-87.2 39.199-87.2 87.2v37.6H37.6C16.8 137.6 0 154.4 0 175.2s16.8 37.6 37.6 37.6h112v661.6c0 76 61.6 137.6 137.6 137.6h449.6c76 0 137.6-61.6 137.6-137.6V212h112c20.8 0 37.6-16.8 37.6-37.6s-16.8-36.8-37.6-36.8zM512 824c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0 20.8 16.8 37.6 37.6 37.6m-175.2 0c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0.8 20.8 17.6 37.6 37.6 37.6m350.4 0c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0 20.8 16.8 37.6 37.6 37.6' : '';
                })
                .style("stroke", "#000")
                .style("fill", "#D71212")
                .on('click',self.deleteItem);


            // Transition nodes to their new position.原有节点更新到新位置
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr('transform', function(d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                });
            //代表是否展开的+-号
            nodeEnter.append("svg:text")
                .attr("class", "isExpand")
                .attr("x", 0)
                .attr("dy", function(d) {
                    return (d.agentUserName == 'origin') ? 29 :  50;
                })
                .attr("text-anchor", "middle")
                .style("fill", "#000")
                .text(function(d) {
                    if(d.agentUserName == 'origin') {
                        return '-';
                    } 
                    return hasChildNodeArr.indexOf(d) != -1 ? d.isExpand ?"-":"+" : "";
                })
                .on('click',clickExpand);

            nodeUpdate.select('text').style('fill-opacity', 1);

            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr('transform', function(d) {
                    return 'translate(' + source.x + ',' + source.y + ')';
                })
                .remove();
            
            nodeExit.select('text')
                .style('fill-opacity', 1e-6);
            //画线
            var link = g.selectAll('path.' + link_class)
                .data(links, function(d) {
                    return d.target.id;
                });

            link.enter().insert('path', 'g')
                .attr('class', link_class)
                .attr('stroke',function(d){
                    return nodeColor;
                })
                .attr('fill',"none")
                .attr('stroke-width','2px')
                .attr('opacity', 0.5)
                .attr('d', function(d) {
                    var o = {
                        x: source.x0,
                        y: source.y0
                    };
                    return funLine({
                        source: o,
                        target: o
                    });
                })
                .attr("marker-end", function(d) {
                    return "url(#resolvedDown)";
                }) //根据箭头标记的id号标记箭头;
                .attr("id", function(d, i) {
                    return "mypath" + i;
                })
                .style("padding", "0 5px")
                .on('click',self.clickLine);
            link.transition()
                .duration(duration)
                .attr('d', funLine);
            link.exit().transition()
                .duration(duration)
                .attr('d', function(d) {
                    var o = {
                        x: source.x,
                        y: source.y
                    };
                    return funLine({
                        source: o,
                        target: o
                    });
                })
                .remove();
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });



            
            function clickExpand(d) {
                d.isExpand = !d.isExpand;
                // if(d.agentUserName == 'origin') {
                //     return;
                // }
                if(d.children) {
                    d._children = d.children;
                    d.children = null;
                    d3.select(this).text('+')
                } else {
                    d.children = d._children;
                    d._children = null;
                    // expand all if it's the first node
                    if(d.agentUserName == 'origin') {
                        d.children.forEach(expand);
                    }
                    d3.select(this).text('-')
                }
                update(d, originalData, g);
            }
            
        }

        function expand(d) {
            if(d._children) {
                d.isExpand = true;
                d.children = d._children;
                d.children.forEach(expand);
                d._children = null;
            }
        }


        function collapse(d) {
            if(d.children && d.children.length != 0) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
                hasChildNodeArr.push(d);
            }
        }


        function redraw() {
            treeG.attr('transform', 'translate(' + d3.event.translate + ')' +
                ' scale(' + d3.event.scale + ')');
        }

        function disableRightClick() {
            // stop zoom
            if(d3.event.button == 2) {
                console.log('No right click allowed');
                d3.event.stopImmediatePropagation();
            }
        }


        function sortByDate(a, b) {
            var aNum = a.agentUserName.substr(a.agentUserName.lastIndexOf('(') + 1, 4);
            var bNum = b.agentUserName.substr(b.agentUserName.lastIndexOf('(') + 1, 4);
            return d3.ascending(aNum, bNum) ||
                d3.ascending(a.agentUserName, b.agentUserName) ||
                d3.ascending(a.id, b.id);
        }
    },
    drawChart() {
        // First get tree data for both directions.
        this.treeData = {};
        this.treeData['downward'] = this.rootData['downward']
        this.rootRectWidth = this.rootagentUserName.length * 20;
        this.graphTree(this.getTreeConfig());
    },
    
  }
};
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}
#relation-box {
  height: calc(100vh - 300px);
  overflow: auto;
  position: relative;
  top: 20px;
}

.node {
  position: absolute;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  text-align: center;
  background-color: #f6f6f6;
  width: 200px;
  cursor: pointer;
  @include text;
}
.active {
  border: 1px solid $bgColor;
}
.start-end {
  background: $bgColor;
  color: white;
}
.container-box-left {
  position: fixed;
  left: 0;
  z-index: 999;
  padding-top: 20px;
  padding-left: 20px;
  .go-back {
    color: $bgColor;
    font-size: 20px;
  }
}
.container-box-right {
  position: fixed;
  right: 0;
  z-index: 999;
  padding-top: 20px;
  padding-right: 20px;
  button {
    margin-bottom: 10px;
  }
}
.deleteIcon{
  position: absolute;
  right: 5px;
  font-size: 22px;
  color: #d71212;
  z-index: 10;
}
</style>
<style lang="scss">
#relation-box {
  #expend {
    border: 1px solid #000;
    padding: 0 5px;
    white-space: nowrap;
    &:hover{
      border: 1px solid $bgColor;
      color: $bgColor;
    }
  }

}
</style>
