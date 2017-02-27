

### 查询传递的参数格式
---

**维度、指标**

```
    {
        queryModel:{
            
            },
        cube:{
        
        },
        mdx:''
    }
    
    主要就是queryModel对象，维度、指标存储在这
    
    queryModel:{
        axes:{
            FILTER:{
                hierarchies:[]
            },
            COLUMNS:{
                hierarchies:[] //多个维度
            },
            ROWS:{
                hierarchies:[]
            }
        },
        "details":{
            measures:[] //多个指标    
        }
    }
```
    
    
#### --hierarchies--

```    
    hierarchies 每个item的内容
    {
                "mdx": null,
                "filters": [],
                "sortOrder": null,
                "sortEvaluationLiteral": null,
                "hierarchizeMode": null,
                "name": "[人群].[人群]",
                "caption": "人群",
                "dimension": "人群",
                "levels": {
                  "人群": {
                    "mdx": null,
                    "filters": [],
                    "name": "人群",
                    "caption": "人群",
                    "selection": {
                      "type": "INCLUSION",
                      "members": [],
                      "parameterName": null
                    },
                    "aggregators": [],
                    "measureAggregators": []
                  }
                },
                "cmembers": {}
     }
 ```
    
#### --details---

```
    detail描述指标数据
    "details": {
          "axis": "COLUMNS|ROWS", **
          "location": "TOP|BOTTOM", **
          "measures": [
            {
              "name": "推送量(PDB)",
              "uniqueName": "[Measures].[推送量(PDB)]",
              "caption": "推送量(PDB)",
              "type": "EXACT",
              "aggregators": []
            },
            {
              "name": "推送量(RTB)",
              "uniqueName": "[Measures].[推送量(RTB)]",
              "caption": "推送量(RTB)",
              "type": "EXACT",
              "aggregators": []
            }
          ]
    }
    
```    

###返回的数据结构
---

```
    {
        cellset:[ //二维数组,每个数组是一行
            [],
            []
        ]
    }

```